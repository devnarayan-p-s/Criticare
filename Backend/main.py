from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.staff import router as staff
from routes.doctor import router as doctor
from routes.allocation import router as allocation

app = FastAPI(title="Criticare Hospital System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(staff)
app.include_router(doctor)
app.include_router(allocation)