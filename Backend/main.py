from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import staff, doctor, allocation

app = FastAPI(title="Criticare Hospital System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(staff.router)
app.include_router(doctor.router)
app.include_router(allocation.router)
