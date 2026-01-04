import React, { useState } from "react";
import { TextField, Button, Paper, Box, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { getPatient, dischargePatient } from "../services/api";

export default function AccessPatient() {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState(null);

  const loadPatient = async () => {
    setLoading(true); setMessage(null);
    try {
      const p = await getPatient(Number(patientId));
      setPatient(p);
    } catch (err) {
      setMessage({ error: err.response?.data || err.message });
      setPatient(null);
    } finally { setLoading(false); }
  };

  const handleDischarge = async () => {
    if (!confirm) return setMessage({ error: 'Toggle confirm to discharge' });
    setLoading(true); setMessage(null);
    try {
      const res = await dischargePatient(Number(patientId));
      setMessage({ success: res });
      setPatient(null);
    } catch (err) {
      setMessage({ error: err.response?.data || err.message });
    } finally { setLoading(false); setConfirm(false); }
  };

  return (
    <Paper sx={{ p:3, maxWidth:600, mx:'auto' }}>
      <h2>Access Patient</h2>
      <Box sx={{ display:'flex', gap:2, mb:2 }}>
        <TextField label="Patient ID" value={patientId} onChange={(e)=>setPatientId(e.target.value)} />
        <Button variant="contained" onClick={loadPatient} disabled={loading}>Load</Button>
      </Box>

      {patient && (
        <Box sx={{ mb:2 }}>
          <strong>{patient.name}</strong> (ID: {patient.id})
          <div>Doctor: {patient.doctor_name}</div>
          <div>Disease: {patient.disease || '-'}</div>
        </Box>
      )}

      <FormControlLabel control={<Checkbox checked={confirm} onChange={(e)=>setConfirm(e.target.checked)} />} label="Confirm Discharge" />
      <Box sx={{ mt:2 }}>
        <Button variant="contained" color="error" onClick={handleDischarge} disabled={loading}>Discharge</Button>
      </Box>

      {message && (message.error ? <Alert severity="error" sx={{mt:2}}>{JSON.stringify(message.error)}</Alert> : <Alert severity="success" sx={{mt:2}}>{JSON.stringify(message.success)}</Alert>)}
    </Paper>
  );
}
