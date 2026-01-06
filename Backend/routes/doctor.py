
from fastapi import APIRouter
from database.db import get_db
from models.schemas import DoctorUpdate

router = APIRouter(prefix="/doctor", tags=["Doctor"])

@router.get("/patient/{patient_id}")
def get_patient(patient_id: int):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("SELECT * FROM patients WHERE patient_id = ?", (patient_id,))
    row = cursor.fetchone()

    cursor.close()
    db.close()

    if not row:
        return {"message": "Patient not found"}

    # sqlite3.Row -> dict
    return dict(row)


@router.post("/update")
def update_medical_details(data: DoctorUpdate):
    db = get_db()
    cursor = db.cursor()

    cursor.execute("""
        UPDATE patients
        SET disease = ?, symptoms = ?, emergency = ?
        WHERE patient_id = ?
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
