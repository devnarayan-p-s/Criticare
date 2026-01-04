import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import NewPatient from "./pages/NewPatient";
import AllocateRoom from "./pages/AllocateRoom";
import AccessPatient from "./pages/AccessPatient";

export default function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Criticare Hospital</Typography>
          <Button color="inherit" component={Link} to="/new">New Patient</Button>
          <Button color="inherit" component={Link} to="/allocate">Allocate</Button>
          <Button color="inherit" component={Link} to="/access">Access</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewPatient />} />
          <Route path="/allocate" element={<AllocateRoom />} />
          <Route path="/access" element={<AccessPatient />} />
        </Routes>
      </Container>
    </div>
  );
}

function Home() {
  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
      <Button variant="outlined" component={Link} to="/new">New Patient</Button>
      <Button variant="outlined" component={Link} to="/allocate">Allocate Room</Button>
      <Button variant="outlined" component={Link} to="/access">Access Patient</Button>
    </Box>
  );
}
