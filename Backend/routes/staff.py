from fastapi import APIRouter
from database.db import get_db
from models.schemas import PatientRegister
from data.resources import rooms, wards, icu_beds

router = APIRouter(prefix="/staff", tags=["Staff"])

@router.post("/register")
def register_patient(data: PatientRegister):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        INSERT INTO patients
        (name, age, gender, contact, address, dr_name)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        data.name,
        data.age,
        data.gender,
        data.contact,
        data.address,
        data.dr_name
    ))

    db.commit()
    patient_id = cursor.lastrowid

    cursor.close()
    db.close()

    return {
        "message": "Patient registered successfully",
        "patient_id": patient_id
    }

@router.post("/discharge/{patient_id}")
def discharge_patient(patient_id: int):
    # Free resources
    for room in rooms:
        if room["patient_id"] == patient_id:
            room["is_available"] = True
            room["patient_id"] = None
    for ward in wards:
        for bed in ward["beds"]:
            if bed["patient_id"] == patient_id:
                bed["is_available"] = True
                bed["patient_id"] = None
    for bed in icu_beds:
        if bed["patient_id"] == patient_id:
            bed["is_available"] = True
            bed["patient_id"] = None

    # Update DB
    db = get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE patients SET discharged = 1 WHERE patient_id = %s", (patient_id,))
    db.commit()
    cursor.close()
    db.close()

    return {"message": "Patient discharged"}
