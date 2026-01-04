import React, { useState } from "react";
import { TextField, Button, Paper, Box, Alert } from '@mui/material';
import { registerPatient } from "../services/api";

export default function NewPatient() {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '', address: '', doctor_name: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await registerPatient({ ...form, age: Number(form.age) });
      setResult(res);
      setForm({ name: '', age: '', gender: '', contact: '', address: '', doctor_name: '' });
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p:3, maxWidth:600, mx:'auto' }}>
      <h2>Register New Patient</h2>
      <Box component="form" onSubmit={handleSubmit} sx={{ display:'grid', gap:2 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField label="Age" name="age" type="number" value={form.age} onChange={handleChange} required />
        <TextField label="Gender" name="gender" value={form.gender} onChange={handleChange} required />
        <TextField label="Contact" name="contact" value={form.contact} onChange={handleChange} required />
        <TextField label="Address" name="address" value={form.address} onChange={handleChange} required />
        <TextField label="Doctor Name" name="doctor_name" value={form.doctor_name} onChange={handleChange} required />
        <Box sx={{ display:'flex', gap:2 }}>
          <Button type="submit" variant="contained" disabled={loading}>{loading ? 'Registering...' : 'Register'}</Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mt:2 }}>{JSON.stringify(error)}</Alert>}
      {result && <Alert severity="success" sx={{ mt:2 }}>Registered! Patient ID: {result.patient_id}</Alert>}
    </Paper>
  );
}
