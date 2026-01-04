from fastapi import APIRouter
from database.db import get_db
from models.schemas import PatientRegister

router = APIRouter(prefix="/staff", tags=["Staff"])

@router.post("/register")
def register_patient(data: PatientRegister):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        INSERT INTO patients
        (name, age, gender, contact, address, doctor_name)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        data.name,
        data.age,
        data.gender,
        data.contact,
        data.address,
        data.doctor_name
    ))

    db.commit()
    patient_id = cursor.lastrowid

    cursor.close()
    db.close()

    return {
        "message": "Patient registered successfully",
        "patient_id": patient_id
    }
