import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Clinics from "./pages/Clinics";
import NewClinic from "./pages/NewClinic";
import ClinicDetails from "./pages/ClinicDetails";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import PatientDetails from "./pages/PatientDetails";
import Procedures from "./pages/Procedures";
import ProcedureDetails from "./pages/ProcedureDetails";
import AddProcedure from "./pages/AddProcedure";
import EditProcedure from "./pages/EditProcedure";
import PrimaryTeethChart from "./components/patients/PrimaryTeethChart";
import PermanentTeethChart from "./components/patients/PermanentTeethChart";
import Appointments from "./pages/Appointments";
import NewAppointment from "./pages/NewAppointment";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import TreatmentHistory from "./pages/TreatmentHistory";
import TreatmentDetails from "./pages/TreatmentDetails";
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
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/new" element={<AddPatient />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/procedures" element={<Procedures />} />
          <Route path="/procedures/:id" element={<ProcedureDetails />} />
          <Route path="/procedures/new" element={<AddProcedure />} />
          <Route path="/procedures/:id/edit" element={<EditProcedure />} />
          <Route path="/patients/:id/primary-teeth" element={<PrimaryTeethChart />} />  
          <Route path="/patients/:id/permanent-teeth" element={<PermanentTeethChart />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/treatment-history" element={<TreatmentHistory />} />
          <Route path="/treatments/history/:id" element={<TreatmentDetails />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
