import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Criticare Hospital System</h1>
      <div className="home-buttons">
        <Link to="/new-patient">
          <button className="home-btn">New Patient</button>
        </Link>
        <Link to="/allocate-room">
          <button className="home-btn">Allocate Room</button>
        </Link>
        <Link to="/access-patient">
          <button className="home-btn">Access Patient</button>
        </Link>
        <Link to="/resources">
          <button className="home-btn">View Resources</button>
        </Link>
        <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">
          <button className="home-btn">Insurance Claim</button>
        </a>
      </div>
    </div>
  );
}

export default Home;
