import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", // FastAPI
});

/* 1. Create Pre-Authorization */
export const createPreAuth = (data) =>
  api.post("/claims/preauth", data);

/* 2. Upload documents */
export const uploadDocuments = (claimId, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/claims/${claimId}/documents`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/* 3. Get claim details */
export const getClaim = (claimId) =>
  api.get(`/claims/${claimId}`);
