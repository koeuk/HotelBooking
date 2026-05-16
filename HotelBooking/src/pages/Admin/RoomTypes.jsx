import { useEffect, useState } from "react";
import api from "../../lib/api";
import { BedDouble, Users, Plus, Maximize2 } from "lucide-react";

export default function AdminRoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/room-types")
      .then((res) => setRoomTypes(res.data.data || res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Room Types</h1>
          <p className="text-slate-500 mt-1">
            Manage your room categories and pricing.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm cursor-pointer"
          onClick={() => alert("Add Room Type — coming soon")}
        >
          <Plus size={18} />
          Add Room Type
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : roomTypes.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <BedDouble size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 font-semibold">No room types yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomTypes.map((rt) => {
            const rtId = rt.uuid || rt.id;
            return (
              <div
                key={rtId}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={
                      rt.images?.[0] ||
                      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600"
                    }
                    alt={rt.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-900 text-lg">
                      {rt.name}
                    </h3>
                    <span
                      className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${rt.is_active !== false ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}
                    >
                      {rt.is_active !== false ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                    {rt.max_guests && (
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                        <Users size={12} className="text-green-800" />
                        Up to {rt.max_guests} guests
                      </div>
                    )}
                    {rt.bed_type && (
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                        <BedDouble size={12} className="text-green-800" />
                        {rt.bed_type}
                      </div>
                    )}
                    {rt.size_sqm && (
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                        <Maximize2 size={12} className="text-green-800" />
                        {rt.size_sqm} m²
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-xl font-bold text-green-800">
                        ${rt.price_per_night}
                      </span>
                      <span className="text-slate-400 text-xs"> / night</span>
                    </div>
                    <button
                      className="text-xs font-semibold text-green-800 hover:underline cursor-pointer"
                      onClick={() => alert(`Edit "${rt.name}" — coming soon`)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
