from fastapi import APIRouter
from database.db import get_db
from data.resources import rooms, wards, icu_beds

router = APIRouter(prefix="/allocate", tags=["Allocation"])

@router.post("/room")
def allocate_room():
    for room in rooms:
        if room["is_available"]:
            room["is_available"] = False
            return {"allocated_room": room["room_id"]}
    return {"message": "No rooms available"}


@router.post("/ward")
def allocate_ward():
    for ward in wards:
        for bed in ward["beds"]:
            if bed["is_available"]:
                bed["is_available"] = False
                return {
                    "ward": ward["ward_name"],
                    "bed": bed["bed_id"]
                }
    return {"message": "No ward beds available"}


@router.post("/icu/{patient_id}")
def allocate_icu(patient_id: int):
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        "SELECT emergency FROM patients WHERE id = %s",
        (patient_id,)
    )
    result = cursor.fetchone()

    cursor.close()
    db.close()

    if not result or result[0] != 1:
        return {"message": "Not an emergency case"}

    for bed in icu_beds:
        if bed["is_available"]:
            bed["is_available"] = False
            bed["patient_id"] = patient_id
            return {"allocated_icu": bed["bed_id"]}

    return {"message": "No ICU beds available"}
