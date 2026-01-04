import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Criticare Hospital System</h1>
      <div className="home-buttons">
        <Link to="/new-patient">
          <button className="btn">New Patient</button>
        </Link>
        <Link to="/allocate-room">
          <button className="btn">Allocate Room</button>
        </Link>
        <Link to="/access-patient">
          <button className="btn">Access Patient</button>
        </Link>
        <Link to="/resources">
          <button className="btn">View Resources</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;