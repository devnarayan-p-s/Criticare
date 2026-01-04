import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NewPatient from './components/NewPatient';
import AllocateRoom from './components/AllocateRoom';
import AccessPatient from './components/AccessPatient';
import Resources from './components/Resources';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-patient" element={<NewPatient />} />
          <Route path="/allocate-room" element={<AllocateRoom />} />
          <Route path="/access-patient" element={<AccessPatient />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;