from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.staff import router as staff_router
from routes.doctor import router as doctor_router
from routes.allocation import router as allocation_router
from routes.insurance import router as insurance_router
from routes.ocr import router as ocr_router

app = FastAPI()

# CORS (important for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include ALL routers
app.include_router(staff_router, tags=["Staff"])
app.include_router(doctor_router, tags=["Doctor"])
app.include_router(allocation_router, tags=["Allocation"])
app.include_router(insurance_router, tags=["Insurance"])
app.include_router(ocr_router, tags=["OCR"])
