import React, { useState } from "react";
import { TextField, Button, Paper, Box, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { getPatient, updateMedical, allocateIcu, allocateRoom, allocateWard } from "../services/api";

export default function AllocateRoom() {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ disease: '', symptoms: '', emergency: false });
  const [message, setMessage] = useState(null);

  const loadPatient = async () => {
    setLoading(true); setMessage(null);
    try {
      const p = await getPatient(Number(patientId));
      setPatient(p);
      setForm({ ...form, emergency: !!p.emergency });
    } catch (err) {
      setMessage({ error: err.response?.data || err.message });
      setPatient(null);
    } finally { setLoading(false); }
  };

  const handleUpdate = async () => {
    setLoading(true); setMessage(null);
    try {
      await updateMedical({ patient_id: Number(patientId), disease: form.disease, symptoms: form.symptoms, emergency: form.emergency });
      setMessage({ success: 'Medical details updated' });
    } catch (err) {
      setMessage({ error: err.response?.data || err.message });
    } finally { setLoading(false); }
  };

  const handleAllocateIcu = async () => {
    setLoading(true); setMessage(null);
    try {
      const res = await allocateIcu(Number(patientId));
      setMessage({ success: res });
    } catch (err) {
      setMessage({ error: err.response?.data || err.message });
    } finally { setLoading(false); }
  };

  const handleAllocateRoom = async () => {
    setLoading(true); setMessage(null);
    try {
      const res = await allocateRoom(Number(patientId));
      setMessage({ success: res });
    } catch (err) {
      setMessage({ error: err.response?.data || err.message });
    } finally { setLoading(false); }
  };

  const handleAllocateWard = async () => {
    setLoading(true); setMessage(null);
    try {
      const res = await allocateWard(Number(patientId));
      setMessage({ success: res });
    } catch (err) {
      setMessage({ error: err.response?.data || err.message });
    } finally { setLoading(false); }
  };

  return (
    <Paper sx={{ p:3, maxWidth:800, mx:'auto' }}>
      <h2>Allocate Room / Ward / ICU</h2>
      <Box sx={{ display:'flex', gap:2, mb:2 }}>
        <TextField label="Patient ID" value={patientId} onChange={(e)=>setPatientId(e.target.value)} />
        <Button variant="contained" onClick={loadPatient} disabled={loading}>Load</Button>
      </Box>

      {patient && (
        <Box sx={{ mb:2 }}>
          <strong>{patient.name}</strong> (ID: {patient.id})
          <div>Doctor: {patient.doctor_name}</div>
        </Box>
      )}

      <Box component="form" sx={{ display:'grid', gap:2 }}>
        <TextField label="Disease" value={form.disease} onChange={(e)=>setForm({...form, disease: e.target.value})} />
        <TextField label="Symptoms" value={form.symptoms} onChange={(e)=>setForm({...form, symptoms: e.target.value})} />
        <FormControlLabel control={<Checkbox checked={form.emergency} onChange={(e)=>setForm({...form, emergency: e.target.checked})} />} label="Emergency" />
        <Box sx={{ display:'flex', gap:2 }}>
          <Button variant="outlined" onClick={handleUpdate} disabled={loading}>Save Medical Details</Button>
          <Button variant="contained" color="error" onClick={handleAllocateIcu} disabled={loading}>Allocate ICU</Button>
          <Button variant="contained" onClick={handleAllocateRoom} disabled={loading}>Allocate Room</Button>
          <Button variant="contained" onClick={handleAllocateWard} disabled={loading}>Allocate Ward</Button>
        </Box>
      </Box>

      {message && (message.error ? <Alert severity="error" sx={{mt:2}}>{JSON.stringify(message.error)}</Alert> : <Alert severity="success" sx={{mt:2}}>{JSON.stringify(message.success)}</Alert>)}
    </Paper>
  );
}
