import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import {
  BedDouble,
  CalendarCheck,
  DollarSign,
  Layers,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
} from "lucide-react";

const STATUS_COLORS = {
  confirmed:   "bg-green-50 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
  checked_in: "bg-blue-100 text-blue-700",
  checked_out: "bg-slate-100 text-slate-600",
  completed: "bg-slate-100 text-slate-600",
};

const STATUS_ICONS = {
  confirmed: <CheckCircle size={12} />,
  pending: <Clock size={12} />,
  cancelled: <XCircle size={12} />,
  checked_in: <CheckCircle size={12} />,
  checked_out: <CheckCircle size={12} />,
  completed: <CheckCircle size={12} />,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState({ total: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings", { params: { per_page: 5 } })
      .then((res) => {
        const data = res.data.data || [];
        setRecentBookings(data);
        const all = res.data.data || [];
        const revenue = all.reduce(
          (sum, b) => sum + (parseFloat(b.total_price) || 0),
          0,
        );
        setBookingStats({
          total: res.data.meta?.total || res.data.total || data.length,
          revenue,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      label: "Total Rooms",
      value: "25",
      icon: <BedDouble size={22} />,
      color: "bg-blue-500",
      sub: "Across all floors",
    },
    {
      label: "Room Types",
      value: "3",
      icon: <Layers size={22} />,
      color: "bg-purple-500",
      sub: "Standard, Deluxe, Suite",
    },
    {
      label: "Total Bookings",
      value: loading ? "—" : String(bookingStats.total),
      icon: <CalendarCheck size={22} />,
      color: "bg-primary",
      sub: "All time",
    },
    {
      label: "Total Revenue",
      value: loading ? "—" : `$${bookingStats.revenue.toFixed(0)}`,
      icon: <DollarSign size={22} />,
      color: "bg-amber-500",
      sub: "From completed stays",
    },
  ];

  const quickActions = [
    {
      label: "Manage Rooms",
      path: "/admin/rooms",
      icon: <BedDouble size={18} />,
    },
    {
      label: "View Bookings",
      path: "/admin/bookings",
      icon: <CalendarCheck size={18} />,
    },
    {
      label: "Hotel Settings",
      path: "/admin/hotel-settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">
          Here's what's happening at your hotel today.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-xl`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
              {stat.value}
            </h3>
            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => navigate(action.path)}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all text-sm cursor-pointer"
            >
              {action.icon}
              {action.label}
              <ArrowRight size={15} />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Recent Bookings</h2>
          <button
            onClick={() => navigate("/admin/bookings")}
            className="text-sm text-green-800 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-14 bg-slate-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <p className="text-slate-400 text-center py-10">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 font-semibold text-xs uppercase tracking-wide">
                  <th className="text-left pb-3 pl-2">Guest</th>
                  <th className="text-left pb-3">Room</th>
                  <th className="text-left pb-3">Check-in</th>
                  <th className="text-left pb-3">Check-out</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="text-right pb-3 pr-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 pl-2 font-medium text-slate-800">
                      {booking.user?.name || booking.guest_name || "—"}
                    </td>
                    <td className="py-3 text-slate-600">
                      {booking.room?.room_type?.name
                        ? `${booking.room.room_type.name} #${booking.room.room_number}`
                        : `#${booking.room?.room_number || "—"}`}
                    </td>
                    <td className="py-3 text-slate-500">
                      {booking.check_in_date || booking.check_in || "—"}
                    </td>
                    <td className="py-3 text-slate-500">
                      {booking.check_out_date || booking.check_out || "—"}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[booking.status] || STATUS_COLORS.pending}`}
                      >
                        {STATUS_ICONS[booking.status]}
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 pr-2 text-right font-bold text-slate-800">
                      ${booking.total_price || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
