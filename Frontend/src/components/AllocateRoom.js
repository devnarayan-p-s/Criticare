import React, { useState } from 'react';

function AllocateRoom() {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    disease: '',
    symptoms: '',
    emergency: false
  });
  const [allocationType, setAllocationType] = useState('');

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8000/doctor/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, patient_id: parseInt(patientId) })
      });
      alert('Medical details updated');
      if (formData.emergency) {
        allocateICU();
      } else {
        // Wait for selection
      }
    } catch (error) {
      alert('Error updating');
    }
  };

  const allocateICU = async () => {
    try {
      const response = await fetch(`http://localhost:8000/allocate/icu/${patientId}`, { method: 'POST' });
      const data = await response.json();
      alert(data.message || `Allocated ICU: ${data.allocated_icu}`);
    } catch (error) {
      alert('Error allocating ICU');
    }
  };

  const allocateResource = async () => {
    try {
      let url = '';
      if (allocationType === 'room') {
        url = `http://localhost:8000/allocate/room/${patientId}`;
      } else if (allocationType === 'ward') {
        url = `http://localhost:8000/allocate/ward/${patientId}`;
      }
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      alert(data.message || `Allocated: ${JSON.stringify(data)}`);
    } catch (error) {
      alert('Error allocating');
    }
  };

  return (
    <div className="container">
      <h2>Allocate Room</h2>
      <div className="form">
        <input placeholder="Patient ID" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
        <button onClick={fetchPatient} className="btn">Fetch Patient</button>
      </div>
      {patient && (
        <div>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <form onSubmit={handleUpdate} className="form">
            <input name="disease" placeholder="Disease" value={formData.disease} onChange={handleChange} required />
            <input name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleChange} required />
            <label>
              <input name="emergency" type="checkbox" checked={formData.emergency} onChange={handleChange} />
              Emergency
            </label>
            <button type="submit" className="btn">Update and Allocate</button>
          </form>
          {!formData.emergency && (
            <div className="form">
              <select value={allocationType} onChange={(e) => setAllocationType(e.target.value)}>
                <option value="">Select Allocation</option>
                <option value="room">Room</option>
                <option value="ward">Ward</option>
              </select>
              <button onClick={allocateResource} className="btn">Allocate</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AllocateRoom;