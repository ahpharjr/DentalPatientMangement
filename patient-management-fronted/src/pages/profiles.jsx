import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" />
                Back 
            </button>
            <div className="max-w-4xl mx-auto space-y-6 mt-2">

                {/* Header Card */}
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-6 shadow-sm">

                    <div className="flex items-center gap-6">
                        <img
                            src="/ahphar.png"
                            alt="Profile"
                            className="h-24 w-24 rounded-2xl object-cover border border-zinc-300 dark:border-white/10"
                        />

                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold">
                                Dr. Sai Pee
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                Dental Clinic Owner
                            </p>
                            <p className="text-sm text-zinc-400 mt-1">
                                sai.pee@mongyangclinic.com
                            </p>
                        </div>

                        <button
                            onClick={() => setEditMode(!editMode)}
                            className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
                        >
                            {editMode ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>
                </div>

                {/* Details Card */}
                <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 p-6 shadow-sm space-y-6">

                    <h3 className="text-lg font-semibold">
                        Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="text-sm text-zinc-500 dark:text-zinc-400">
                                Full Name
                            </label>
                            <input
                                disabled={!editMode}
                                defaultValue="Dr. Sai Pee"
                                className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-zinc-500 dark:text-zinc-400">
                                Email
                            </label>
                            <input
                                disabled={!editMode}
                                defaultValue="sai.pee@mongyangclinic.com"
                                className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-zinc-500 dark:text-zinc-400">
                                Phone
                            </label>
                            <input
                                disabled={!editMode}
                                defaultValue="+66 98 123 4567"
                                className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-white/10 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-zinc-500 dark:text-zinc-400">
                                Role
                            </label>
                            <input
                                disabled
                                defaultValue="Owner"
                                className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {editMode && (
                        <div className="flex justify-end">
                            <button className="px-6 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition">
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
