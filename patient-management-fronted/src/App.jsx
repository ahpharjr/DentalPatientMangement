import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Clinics from "./pages/Clinics";
import NewClinic from "./pages/NewClinic";
import ClinicDetails from "./pages/ClinicDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/clinics/new" element={<NewClinic />} />
          <Route path="/clinics/:id" element={<ClinicDetails />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
