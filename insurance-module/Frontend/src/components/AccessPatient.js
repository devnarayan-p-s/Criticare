import React, { useState } from 'react';

function AccessPatient() {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);

  const fetchPatient = async () => {
    try {
      const response = await fetch(`http://localhost:8000/doctor/patient/${patientId}`);
      const data = await response.json();
      if (data.message) {
        alert(data.message);
      } else {
        setPatient(data);
      }
    } catch (error) {
      alert('Error fetching patient');
    }
  };

  const dischargePatient = async () => {
    try {
      const response = await fetch(`http://localhost:8000/staff/discharge/${patientId}`, { method: 'POST' });
      const data = await response.json();
      alert(data.message);
      // Refresh patient data
      fetchPatient();
    } catch (error) {
      alert('Error discharging patient');
    }
  };

  return (
    <div className="container">
      <h2>Access Patient</h2>
      <div className="form">
        <input placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        <button onClick={fetchPatient} className="btn">Access Patient</button>
      </div>
      {patient && (
        <div>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Doctor:</strong> {patient.dr_name}</p>
          <p><strong>Disease:</strong> {patient.disease}</p>
          <p><strong>Symptoms:</strong> {patient.symptoms}</p>
          <p><strong>Emergency:</strong> {patient.emergency ? 'Yes' : 'No'}</p>
          <p><strong>Discharged:</strong> {patient.discharged ? 'Yes' : 'No'}</p>
          {!patient.discharged && (
            <button onClick={dischargePatient} className="btn">Discharge Patient</button>
          )}
        </div>
      )}
    </div>
  );
}

export default AccessPatient;