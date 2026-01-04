import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" }
});

export const registerPatient = (data) => api.post("/staff/register", data).then(r => r.data);
export const getPatient = (id) => api.get(`/doctor/patient/${id}`).then(r => r.data);
export const updateMedical = (data) => api.post(`/doctor/update`, data).then(r => r.data);
export const allocateIcu = (id) => api.post(`/allocate/icu/${id}`).then(r => r.data);
export const allocateRoom = (patient_id) => api.post(`/allocate/room`, { patient_id }).then(r => r.data);
export const allocateWard = (patient_id) => api.post(`/allocate/ward`, { patient_id }).then(r => r.data);
export const dischargePatient = (patient_id) => api.post(`/staff/discharge`, { patient_id }).then(r => r.data);

export default api;
