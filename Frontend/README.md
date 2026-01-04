# Criticare Frontend (MUI)

A minimal React + Vite frontend using Material UI. The frontend expects the backend API at `http://localhost:8000`.

Install & run:

```bash
cd Criticare/Backend # ensure backend is running (uvicorn)
# in another terminal
cd Criticare/Frontend
npm install
npm run dev
```

API notes:
- `POST /staff/register` to create patient
- `GET /doctor/patient/{id}` to fetch patient
- `POST /doctor/update` to save medical details
- `POST /allocate/icu/{id}` to allocate ICU
- `POST /allocate/room` with `{ patient_id }` to allocate room
- `POST /allocate/ward` with `{ patient_id }` to allocate ward bed
- `POST /staff/discharge` with `{ patient_id }` to discharge
