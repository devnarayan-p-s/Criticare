import React, { useState } from 'react';

function NewPatient() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
    dr_name: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [patientId, setPatientId] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/staff/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setPatientId(data.patient_id);
        setShowPopup(true);
      } else {
        alert('Error: ' + data.detail || 'Registration failed');
      }
    } catch (error) {
      alert('Error registering patient: ' + error.message);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(patientId.toString());
    alert('Patient ID copied to clipboard!');
  };

  const closePopup = () => {
    setShowPopup(false);
    setFormData({
      name: '',
      age: '',
      gender: '',
      contact: '',
      address: '',
      dr_name: ''
    });
  };

  return (
    <div className="container">
      <h2>New Patient Registration</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="dr_name" placeholder="Doctor Name" value={formData.dr_name} onChange={handleChange} required />
        <button type="submit" className="btn">Register</button>
      </form>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Patient Registered Successfully!</h3>
            <p>Patient ID: <span className="patient-id">{patientId}</span></p>
            <button onClick={copyToClipboard} className="btn">Copy ID</button>
            <button onClick={closePopup} className="btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPatient;