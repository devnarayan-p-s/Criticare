import React, { useState, useEffect } from 'react';

function Resources() {
  const [resources, setResources] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('http://localhost:8000/allocate/resources');
      const data = await response.json();
      setResources(data);
    } catch (error) {
      alert('Error fetching resources');
    }
  };

  if (!resources) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2>Hospital Resources Status</h2>
      <div className="resources-section">
        <h3>Rooms</h3>
        <div className="resource-grid">
          {resources.rooms.map(room => (
            <div key={room.room_id} className={`resource-item ${room.is_available ? 'available' : 'occupied'}`}>
              {room.room_id}
              {!room.is_available && <span> (Occupied by {room.patient_id})</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="resources-section">
        <h3>Wards</h3>
        {resources.wards.map(ward => (
          <div key={ward.ward_name}>
            <h4>{ward.ward_name}</h4>
            <div className="resource-grid">
              {ward.beds.map(bed => (
                <div key={bed.bed_id} className={`resource-item ${bed.is_available ? 'available' : 'occupied'}`}>
                  {bed.bed_id}
                  {!bed.is_available && <span> (Occupied by {bed.patient_id})</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="resources-section">
        <h3>ICU Beds</h3>
        <div className="resource-grid">
          {resources.icu_beds.map(bed => (
            <div key={bed.bed_id} className={`resource-item ${bed.is_available ? 'available' : 'occupied'}`}>
              {bed.bed_id}
              {!bed.is_available && <span> (Occupied by {bed.patient_id})</span>}
            </div>
          ))}
        </div>
      </div>
      <button onClick={fetchResources} className="btn">Refresh</button>
    </div>
  );
}

export default Resources;