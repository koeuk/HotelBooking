import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Star, Save, Hotel } from "lucide-react";

export default function AdminHotelSettings() {
  const [hotel, setHotel] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/hotel")
      .then((res) => {
        const data = res.data.data || res.data;
        setHotel(data);
        setForm({
          name: data?.name || "",
          description: data?.description || "",
          address: data?.address || "",
          phone: data?.phone || "",
          email: data?.email || "",
          check_in_time: data?.check_in_time || "14:00",
          check_out_time: data?.check_out_time || "12:00",
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.put("/hotel", form);
      setSaved(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const renderStars = (count = 5) => (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={20}
          className={
            i < count
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200 fill-slate-200"
          }
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Hotel Settings</h1>
        <p className="text-slate-500 mt-1">
          View and update your hotel information.
        </p>
      </header>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-14 bg-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
          {/* Hotel identity header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Hotel size={28} className="text-green-800" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {hotel?.name || "Your Hotel"}
              </h2>
              {hotel?.stars && (
                <div className="mt-1">{renderStars(hotel.stars)}</div>
              )}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium">
              {error}
            </div>
          )}
          {saved && (
            <div className="mb-6 p-4 bg-accent text-secondary rounded-2xl text-sm font-medium">
              Settings saved successfully.
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Hotel Name
                </label>
                <input
                  type="text"
                  value={form.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Phone
                </label>
                <input
                  type="text"
                  value={form.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Address
              </label>
              <input
                type="text"
                value={form.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Description
              </label>
              <textarea
                rows={4}
                value={form.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Check-in Time
                </label>
                <input
                  type="time"
                  value={form.check_in_time || "14:00"}
                  onChange={(e) =>
                    handleChange("check_in_time", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Check-out Time
                </label>
                <input
                  type="time"
                  value={form.check_out_time || "12:00"}
                  onChange={(e) =>
                    handleChange("check_out_time", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {hotel?.stars && (
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Star Rating (read-only)
                </label>
                {renderStars(hotel.stars)}
                <p className="text-xs text-slate-400 mt-1">
                  Star rating is managed by administrators.
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-7 py-3 bg-primary text-white font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
              >
                <Save size={17} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
