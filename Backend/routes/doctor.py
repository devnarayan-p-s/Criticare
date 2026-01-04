from fastapi import APIRouter
from database.db import get_db
from models.schemas import DoctorUpdate

router = APIRouter(prefix="/doctor", tags=["Doctor"])

@router.get("/patient/{patient_id}")
def get_patient(patient_id: int):
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT * FROM patients WHERE id = %s", (patient_id,))
    patient = cursor.fetchone()

    cursor.close()
    db.close()

    if not patient:
        return {"message": "Patient not found"}

    return patient


@router.post("/update")
def update_medical_details(data: DoctorUpdate):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        UPDATE patients
        SET disease = %s, symptoms = %s, emergency = %s
        WHERE id = %s
    """, (
        data.disease,
        data.symptoms,
        data.emergency,
        data.patient_id
    ))

    db.commit()
    cursor.close()
    db.close()

    return {"message": "Medical details updated"}
