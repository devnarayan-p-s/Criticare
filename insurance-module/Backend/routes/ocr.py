from fastapi import APIRouter, UploadFile, File
from PIL import Image
import pytesseract
import io

router = APIRouter()

@router.post("/scan")
async def scan_document(file: UploadFile = File(...)):
    """
    OCR endpoint for extracting text from uploaded images.
    Used only for supporting documents (lab reports, old records).
    """

    # Read uploaded image
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))

    # Run OCR
    extracted_text = pytesseract.image_to_string(image)

    return {
        "status": "success",
        "extracted_text": extracted_text
    }
