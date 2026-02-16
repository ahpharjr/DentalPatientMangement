import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Building2, User2, Calendar, Pencil, Trash2 } from "lucide-react";

export default function MemberDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data (replace with API later)
    const member = {
        id,
        name: "Dr. Maria Santos",
        role: "Dentist",
        email: "maria@clinic.com",
        phone: "09123456789",
        clinic: "Clinic 1",
        status: "Active",
        address: "Manila, Philippines",
        joinedDate: "2024-01-15",
    };

    return (
        <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <button
                        onClick={() => navigate("/members")}
                        className="mb-2 flex items-center gap-1 text-sm text-zinc-400 hover:text-white cursor-pointer"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Members
                    </button>

                    <h1 className="text-2xl font-semibold text-white">
                        {member.name}
                    </h1>
                    <p className="text-sm text-zinc-400">
                        Member details and information
                    </p>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-2">
                    <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 cursor-pointer">
                        <Pencil className="h-4 w-4" />
                        Edit Member
                    </button>
                    <button
                        className="
                                    flex items-center gap-2 cursor-pointer
                                    rounded-lg border border-white/10
                                    bg-zinc-900 px-4 py-2 text-sm text-white
                                    transition-all duration-200
                                    hover:bg-red-600 hover:border-red-600 hover:text-white
                                "
                    >
                        <Trash2 className="h-4 w-4 transition-colors duration-200 group-hover:text-white " />
                        Delete Member
                    </button>
                </div> */}
            </div>

            {/* Profile Card */}
            <div className="rounded-2xl border border-white/10 bg-linear-to-br from-zinc-900 to-zinc-950 p-6 shadow-lg">
                <div className="flex items-center gap-6">

                    {/* Avatar */}
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white shadow-lg">
                        {member.name.charAt(0)}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-semibold text-white">
                                {member.name}
                            </h2>

                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
                                {member.status}
                            </span>
                        </div>

                        <p className="mt-1 text-zinc-400">{member.role}</p>
                        <p className="mt-1 text-sm text-zinc-500">
                            Member ID: #{member.id}
                        </p>
                    </div>
                </div>
            </div>

            {/* Information Section */}
            <div className="grid gap-6 md:grid-cols-2">

                {/* Contact Card */}
                <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-white">
                        Contact Information
                    </h3>

                    <div className="space-y-4 text-sm">

                        <div className="flex items-center gap-3 text-zinc-300">
                            <Mail className="h-4 w-4 text-blue-400" />
                            {member.email}
                        </div>

                        <div className="flex items-center gap-3 text-zinc-300">
                            <Phone className="h-4 w-4 text-blue-400" />
                            {member.phone}
                        </div>

                        <div className="flex items-center gap-3 text-zinc-300">
                            <Building2 className="h-4 w-4 text-blue-400" />
                            {member.clinic}
                        </div>

                        <div className="flex items-center gap-3 text-zinc-300">
                            <User2 className="h-4 w-4 text-blue-400" />
                            {member.address}
                        </div>

                        <div className="flex items-center gap-3 text-zinc-300">
                            <Calendar className="h-4 w-4 text-blue-400" />
                            Joined {member.joinedDate}
                        </div>

                    </div>
                </div>

                {/* Activity Summary */}
                <div className="rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-white">
                        Activity Summary
                    </h3>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-lg bg-zinc-800 p-4 text-center">
                            <p className="text-2xl font-bold text-white">124</p>
                            <p className="text-xs text-zinc-400">Patients Treated</p>
                        </div>

                        <div className="rounded-lg bg-zinc-800 p-4 text-center">
                            <p className="text-2xl font-bold text-white">38</p>
                            <p className="text-xs text-zinc-400">Appointments This Month</p>
                        </div>

                        <div className="rounded-lg bg-zinc-800 p-4 text-center">
                            <p className="text-2xl font-bold text-white">12</p>
                            <p className="text-xs text-zinc-400">Procedures</p>
                        </div>

                        <div className="rounded-lg bg-zinc-800 p-4 text-center">
                            <p className="text-2xl font-bold text-white">2 yrs</p>
                            <p className="text-xs text-zinc-400">Years in Clinic</p>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}
