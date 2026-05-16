import { useEffect, useState } from "react";
import api from "../../lib/api";
import {
  CalendarCheck,
  Clock,
  CheckCircle,
  XCircle,
  SlidersHorizontal,
} from "lucide-react";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-50 text-green-800",
  checked_in: "bg-blue-100 text-blue-700",
  checked_out: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-slate-100 text-slate-600",
};

const STATUS_ICONS = {
  pending: <Clock size={12} />,
  confirmed: <CheckCircle size={12} />,
  checked_in: <CheckCircle size={12} />,
  checked_out: <CheckCircle size={12} />,
  cancelled: <XCircle size={12} />,
  completed: <CheckCircle size={12} />,
};

const ALL_STATUSES = [
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
  "completed",
];

function calcNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return "—";
  const diff = new Date(checkOut) - new Date(checkIn);
  const n = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return n > 0 ? n : "—";
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const params = {};
    if (statusFilter) params.status = statusFilter;

    setLoading(true);
    api
      .get("/bookings", { params })
      .then((res) => setBookings(res.data.data || res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [statusFilter]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
        <p className="text-slate-500 mt-1">
          View and manage all guest bookings.
        </p>
      </header>

      {/* Filter */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-wrap gap-4 items-end">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <SlidersHorizontal size={16} className="text-green-800" />
          Filter
        </div>
        <div className="flex flex-col gap-1 min-w-[170px]">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
          >
            <option value="">All Statuses</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        {statusFilter && (
          <button
            onClick={() => setStatusFilter("")}
            className="text-sm text-slate-400 hover:text-slate-700 font-medium transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-12 bg-slate-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <CalendarCheck size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-slate-500 font-medium">No bookings found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-slate-500 font-semibold text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-4">ID</th>
                  <th className="text-left px-5 py-4">Guest</th>
                  <th className="text-left px-5 py-4">Room</th>
                  <th className="text-left px-5 py-4">Check-in</th>
                  <th className="text-left px-5 py-4">Check-out</th>
                  <th className="text-left px-5 py-4">Nights</th>
                  <th className="text-left px-5 py-4">Status</th>
                  <th className="text-right px-5 py-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const checkIn = booking.check_in_date || booking.check_in;
                  const checkOut = booking.check_out_date || booking.check_out;
                  return (
                    <tr
                      key={booking.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-5 py-3.5 text-slate-400 font-mono text-xs">
                        #{booking.id}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-slate-800">
                        {booking.user?.name || booking.guest_name || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">
                        {booking.room?.room_type?.name
                          ? `${booking.room.room_type.name} #${booking.room.room_number}`
                          : `#${booking.room?.room_number || "—"}`}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {checkIn || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {checkOut || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {calcNights(checkIn, checkOut)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[booking.status] || STATUS_COLORS.pending}`}
                        >
                          {STATUS_ICONS[booking.status]}
                          {booking.status?.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-slate-800">
                        ${booking.total_price || 0}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
