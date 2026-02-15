import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Clinics from "./pages/clinics/Clinics";
import NewClinic from "./pages/clinics/NewClinic";
import ClinicDetails from "./pages/clinics/ClinicDetails";
import Patients from "./pages/patients/Patients";
import AddPatient from "./pages/patients/AddPatient";
import PatientDetails from "./pages/patients/PatientDetails";
import Procedures from "./pages/procedures/Procedures";
import ProcedureDetails from "./pages/procedures/ProcedureDetails";
import AddProcedure from "./pages/procedures/AddProcedure";
import EditProcedure from "./pages/procedures/EditProcedure";
import PrimaryTeethChart from "./components/patients/PrimaryTeethChart";
import PermanentTeethChart from "./components/patients/PermanentTeethChart";
import Appointments from "./pages/appointments/Appointments";
import NewAppointment from "./pages/appointments/NewAppointment";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import TreatmentHistory from "./pages/treatments/TreatmentHistory";
import TreatmentHistoryDetails from "./pages/treatments/TreatmentHistoryDetails";
import Treatments from "./pages/treatments/Treatments";
import TreatmentDetails from "./pages/treatments/TreatmentDetails";
import NewTreatment from "./pages/treatments/NewTreatment";
import MemberDetails from "./pages/members/MemberDetails";
import Members from "./pages/members/Members";
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
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatment-history" element={<TreatmentHistory />} />
          <Route path="/treatments/history/:id" element={<TreatmentHistoryDetails />} />
          <Route path="/treatments/:id" element={<TreatmentDetails />} />
          <Route path="/treatments/new" element={<NewTreatment />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/:id" element={<MemberDetails />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
