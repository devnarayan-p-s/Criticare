from pydantic import BaseModel

class PatientRegister(BaseModel):
    name: str
    age: int
    gender: str
    contact: str
    address: str
    dr_name: str

class DoctorUpdate(BaseModel):
    patient_id: int
    disease: str
    symptoms: str
    emergency: bool