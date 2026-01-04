from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
import uuid
import os
import re
import joblib
import pytesseract
from PIL import Image

router = APIRouter(
    prefix="/insurance",
    tags=["Insurance"]
)

# --------------------------------------------------
# LOAD TRAINED ML MODEL
# --------------------------------------------------

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
# model is located at <backend>/ml/model/claim_risk.pkl (use relative path so Linux works)
MODEL_PATH = os.path.normpath(os.path.join(SCRIPT_DIR, "..", "ml", "model", "claim_risk.pkl"))

if not os.path.exists(MODEL_PATH):
    raise RuntimeError(f"ML model file not found at {MODEL_PATH}")

ml_model = joblib.load(MODEL_PATH)

# --------------------------------------------------
# MOCK DATA (ADMISSION)
# --------------------------------------------------

MOCK_ADMISSIONS = {
    "ADM123": {
        "admission_id": "ADM123",
        "patient_name": "Amen Roshin",
        "age": 45,
        "status": "ACTIVE"
    }
}

MOCK_CLAIMS = {}

# --------------------------------------------------
# SCHEMAS
# --------------------------------------------------

class InsurancePreAuthRequest(BaseModel):
    admission_id: str
    insurer_name: str
    policy_number: str
    policy_type: str
    sum_insured: float
    estimated_cost: float


# 🔹 ADDED: Status update schema
class StatusUpdateRequest(BaseModel):
    status: str   # PENDING / QUERY / APPROVED / PARTIALLY_APPROVED


# --------------------------------------------------
# OCR → INFORMATION EXTRACTION
# --------------------------------------------------

def extract_features_from_text(text: str):
    """
    Robust, case-insensitive OCR extraction for BMI, Children, Smoking
    Handles OCR noise like extra dots, spaces, symbols.
    """

    def extract_number(keyword):
        match = re.search(
            rf"{keyword}\D+([\d]+(?:\.[\d]+)?)",
            text,
            re.IGNORECASE
        )
        return float(match.group(1)) if match else None

    def extract_smoker():
        match = re.search(
            r"(smoker|smoking)\D+(yes|no|yesl|ycs|ves)",
            text,
            re.IGNORECASE
        )
        if not match:
            return None

        value = match.group(2).lower()

        if value in ["yes", "yesl", "ycs", "ves"]:
            return 1
        if value == "no":
            return 0
        return None

    bmi = extract_number("bmi")
    children = extract_number("children")
    smoker = extract_smoker()

    return {
        "bmi": bmi,
        "children": int(children) if children is not None else None,
        "smoker": smoker
    }



# --------------------------------------------------
# ROUTES
# --------------------------------------------------

# 1️⃣ CREATE PREAUTH (DRAFT)
@router.post("/preauth")
def create_preauth(request: InsurancePreAuthRequest):
    admission = MOCK_ADMISSIONS.get(request.admission_id.upper())

    if not admission:
        raise HTTPException(status_code=404, detail="Admission not found")

    claim_id = f"CLM-{uuid.uuid4().hex[:8].upper()}"

    claim = {
        "claim_id": claim_id,
        "admission_id": request.admission_id.upper(),
        "patient_name": admission["patient_name"],
        "age": admission["age"],
        "sum_insured": request.sum_insured,
        "estimated_cost": request.estimated_cost,
        "bmi": None,
        "children": None,
        "smoker": None,
        "documents": [],
        "status": "DRAFT"
    }

    MOCK_CLAIMS[claim_id] = claim

    return {
        "message": "Pre-authorization created",
        "claim": claim
    }

# 2️⃣ UPLOAD DOCUMENT → OCR → EXTRACT
@router.post("/claim/{claim_id}/documents")
async def upload_document(
    claim_id: str,
    document: UploadFile = File(...)
):
    claim = MOCK_CLAIMS.get(claim_id.upper())

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    image = Image.open(document.file)
    ocr_text = pytesseract.image_to_string(image)

    extracted = extract_features_from_text(ocr_text)

    for field in ["bmi", "children", "smoker"]:
        if extracted[field] is not None:
            claim[field] = extracted[field]

    claim["documents"].append({
        "filename": document.filename,
        "ocr_text": ocr_text
    })

    return {
        "message": "Document processed successfully",
        "extracted_fields": extracted
    }

# 3️⃣ ML RISK PREDICTION (UNCHANGED)
@router.get("/claim/{claim_id}/ml-risk")
def ml_risk_prediction(claim_id: str):
    claim = MOCK_CLAIMS.get(claim_id.upper())

    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    missing = [k for k in ["bmi", "children", "smoker"] if claim[k] is None]
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"Missing extracted fields: {missing}"
        )

    X = [[
        claim["age"],
        claim["bmi"],
        claim["children"],
        claim["smoker"]
    ]]

    probability = ml_model.predict_proba(X)[0][1]

    if probability > 0.7:
        risk = "LOW"
    elif probability > 0.4:
        risk = "MEDIUM"
    else:
        risk = "HIGH"

    return {
        "approval_probability": round(float(probability), 2),
        "risk_level": risk
    }

# --------------------------------------------------
# 🔹 WORKFLOW AUTOMATION (ADDED)
# --------------------------------------------------

# 5️⃣ SUBMIT PREAUTH TO INSURER
@router.post("/claim/{claim_id}/submit")
def submit_claim(claim_id: str):
    claim = MOCK_CLAIMS.get(claim_id.upper())
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    if claim["status"] != "DRAFT":
        raise HTTPException(status_code=400, detail="Claim already submitted")

    claim["status"] = "SUBMITTED"
    return {"message": "Claim submitted to insurer", "status": claim["status"]}


# 6️⃣ UPDATE STATUS (MOCK INSURER RESPONSE)
@router.post("/claim/{claim_id}/status")
def update_status(claim_id: str, request: StatusUpdateRequest):
    claim = MOCK_CLAIMS.get(claim_id.upper())
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    allowed = ["PENDING", "QUERY", "APPROVED", "PARTIALLY_APPROVED"]
    if request.status not in allowed:
        raise HTTPException(status_code=400, detail="Invalid status")

    claim["status"] = request.status
    return {"message": "Status updated", "status": claim["status"]}


# 6️⃣ GET CURRENT STATUS
@router.get("/claim/{claim_id}/status")
def get_status(claim_id: str):
    claim = MOCK_CLAIMS.get(claim_id.upper())
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    return {"claim_id": claim_id, "status": claim["status"]}


# 7️⃣ FINAL SETTLEMENT AT DISCHARGE
@router.post("/claim/{claim_id}/settle")
def settle_claim(claim_id: str):
    claim = MOCK_CLAIMS.get(claim_id.upper())
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    if claim["status"] not in ["APPROVED", "PARTIALLY_APPROVED"]:
        raise HTTPException(
            status_code=400,
            detail="Claim cannot be settled unless approved"
        )

    claim["status"] = "SETTLED"
    return {"message": "Claim settled at discharge", "status": claim["status"]}
