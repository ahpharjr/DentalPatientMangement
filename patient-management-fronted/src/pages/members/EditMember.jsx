import { useParams } from "react-router-dom";
import MemberForm from "../../components/members/MemberForm";

export default function EditMember() {
  const { id } = useParams();

  // Mock data (replace with API)
  const existingMember = {
    id,
    name: "Dr. Maria Santos",
    role: "Dentist",
    email: "maria@clinic.com",
    phone: "09123456789",
    clinic: "Clinic 1",
    address: "Manila, Philippines",
    status: "Active",
  };

  return <MemberForm initialData={existingMember} isEdit />;
}
