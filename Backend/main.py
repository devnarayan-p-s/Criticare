from fastapi import FastAPI
from routes import staff, doctor, allocation

app = FastAPI(title="Criticare Hospital System")

app.include_router(staff.router)
app.include_router(doctor.router)
app.include_router(allocation.router)
