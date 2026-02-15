import { useMemo, useState } from "react";
import {
    DollarSign,
    Calendar,
    TrendingUp,
} from "lucide-react";

export default function Reports() {
    const [range, setRange] = useState("today");

    // 🔥 REALISTIC DUMMY DATA
    const transactions = useMemo(() => [
        {
            id: 1,
            patient: "Maria Santos",
            treatment: "Teeth Cleaning",
            type: "Cleaning",
            amount: 1500,
            date: "2026-02-15",
        },
        {
            id: 2,
            patient: "John Cruz",
            treatment: "Tooth Extraction",
            type: "Extraction",
            amount: 2500,
            date: "2026-02-15",
        },
        {
            id: 3,
            patient: "Angela Reyes",
            treatment: "Braces Adjustment",
            type: "Braces",
            amount: 3500,
            date: "2026-02-14",
        },
        {
            id: 4,
            patient: "Carlos Mendoza",
            treatment: "Root Canal",
            type: "Others",
            amount: 5500,
            date: "2026-02-13",
        },
    ], []);

    // 🔥 AUTO CALCULATIONS
    const totalRevenue = useMemo(() => {
        return transactions.reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);

    const totalTreatments = transactions.length;

    const breakdown = useMemo(() => {
        const result = {};
        transactions.forEach((t) => {
            result[t.type] = (result[t.type] || 0) + t.amount;
        });
        return result;
    }, [transactions]);

    // Fake growth calculation
    const growth = 12.5;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Revenue Reports
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Monitor clinic income and performance insights
                        </p>
                    </div>
                </div>

                {/* Filter */}
                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="bg-zinc-900 border border-white/10 text-white px-3 py-2 rounded-lg text-sm cursor-pointer"
                >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-white/10 bg-zinc-900">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-400">Total Revenue</p>
                        <DollarSign className="h-5 w-5 text-zinc-500" />
                    </div>
                    <p className="mt-4 text-2xl font-bold text-white">
                        ¥
                        {totalRevenue.toLocaleString()}
                    </p>
                </div>

                <div className="p-5 rounded-xl border border-white/10 bg-zinc-900">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-400">Total Treatments</p>
                        <Calendar className="h-5 w-5 text-zinc-500" />
                    </div>
                    <p className="mt-4 text-2xl font-bold text-white">
                        {totalTreatments}
                    </p>
                </div>

                <div className="p-5 rounded-xl border border-white/10 bg-zinc-900">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-400">Growth</p>
                        <TrendingUp className="h-5 w-5 text-zinc-500" />
                    </div>
                    <p className="mt-4 text-2xl font-bold text-green-400">
                        +{growth}%
                    </p>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Revenue Breakdown
                </h2>

                <div className="space-y-3">
                    {Object.entries(breakdown).map(([type, amount]) => (
                        <div
                            key={type}
                            className="flex justify-between text-sm"
                        >
                            <span className="text-zinc-400">{type}</span>
                            <span className="text-white">
                                ¥
                                {amount.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-xl border border-white/10 bg-zinc-900 p-6">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Recent Transactions
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-zinc-400 border-b border-white/10">
                            <tr>
                                <th className="py-3">Patient</th>
                                <th className="py-3">Treatment</th>
                                <th className="py-3">Date</th>
                                <th className="py-3 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((t) => (
                                <tr
                                    key={t.id}
                                    className="border-b border-white/5 hover:bg-zinc-800/40 transition"
                                >
                                    <td className="py-3 text-white">{t.patient}</td>
                                    <td className="py-3 text-zinc-400">
                                        {t.treatment}
                                    </td>
                                    <td className="py-3 text-zinc-400">
                                        {t.date}
                                    </td>
                                    <td className="py-3 text-right text-white font-medium">
                                        ¥
                                        {t.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
