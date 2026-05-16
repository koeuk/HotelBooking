import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  BedDouble,
  Users,
  Maximize2,
  Layers,
  ChevronRight,
  Hash,
} from "lucide-react";

const STATUS_STYLES = {
  available: "bg-green-50 text-green-800",
  booked: "bg-amber-100 text-amber-700",
  maintenance: "bg-red-100 text-red-700",
  cleaning: "bg-blue-100 text-blue-700",
};

const ROOM_TYPES = ["All", "Standard Room", "Deluxe Room", "Suite"];

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: "All", status: "available" });

  useEffect(() => {
    setLoading(true);
    api
      .get("/rooms", { params: { per_page: 50 } })
      .then((res) => {
        const data = res.data.data || res.data || [];
        setRooms(Array.isArray(data) ? data : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = rooms.filter((room) => {
    if (filters.type !== "All" && room.room_type?.name !== filters.type)
      return false;
    if (filters.status !== "all" && room.status !== filters.status)
      return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 px-4 text-center">
        <p className="text-green-800 text-xs font-bold uppercase tracking-[0.2em] mb-3">
          Accommodations
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          Our Rooms
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          {rooms.length} rooms across {ROOM_TYPES.length - 1} categories
        </p>
      </div>

      {/* Filter Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-2 flex flex-wrap gap-2 items-center">
          {/* Room type pills */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl flex-wrap">
            {ROOM_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setFilters((f) => ({ ...f, type: t }))}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  filters.type === t
                    ? "bg-white text-green-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />

          {/* Status select */}
          <div className="flex flex-col min-w-[130px]">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((f) => ({ ...f, status: e.target.value }))
              }
              className="px-3 pb-1.5 bg-transparent text-slate-700 text-sm font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>

          <div className="ml-auto mr-2 text-xs text-slate-400 font-semibold whitespace-nowrap">
            {filtered.length} room{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-white/10 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-muted rounded-3xl border border-border">
            <BedDouble
              size={48}
              className="mx-auto text-muted-foreground mb-4"
            />
            <p className="text-muted-foreground text-xl font-semibold">
              No rooms match your filters.
            </p>
            <button
              onClick={() => setFilters({ type: "All", status: "all" })}
              className="mt-4 text-green-800 underline text-sm cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((room) => {
              const rt = room.room_type || {};
              const isAvailable = room.status === "available";
              return (
                <div
                  key={room.uuid || room.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={
                        rt.images?.[0] ||
                        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600"
                      }
                      alt={rt.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Status badge */}
                    <span
                      className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[room.status] || STATUS_STYLES.available}`}
                    >
                      {room.status}
                    </span>

                    {/* Price */}
                    <div className="absolute bottom-3 left-3 text-white text-sm font-bold">
                      ${rt.price_per_night}
                      <span className="font-normal opacity-75 text-xs">
                        /night
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    {/* Room number + type */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold text-green-800 uppercase tracking-wide">
                          {rt.name}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                          <Hash size={14} className="text-slate-400" />
                          Room {room.room_number}
                        </h3>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                        <Layers size={11} className="text-green-800" />
                        Floor {room.floor}
                      </span>
                      {rt.max_guests && (
                        <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                          <Users size={11} className="text-green-800" />
                          {rt.max_guests} guests
                        </span>
                      )}
                      {rt.bed_type && (
                        <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                          <BedDouble size={11} className="text-green-800" />
                          {rt.bed_type}
                        </span>
                      )}
                      {rt.size_sqm && (
                        <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                          <Maximize2 size={11} className="text-green-800" />
                          {rt.size_sqm} m²
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() =>
                        isAvailable && navigate(`/book/${room.uuid}`)
                      }
                      disabled={!isAvailable}
                      className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 font-bold rounded-2xl transition-colors duration-200 text-sm cursor-pointer ${
                        isAvailable
                          ? "bg-slate-900 hover:bg-primary text-white"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {isAvailable ? (
                        <>
                          Book Now <ChevronRight size={15} />
                        </>
                      ) : (
                        <span className="capitalize">{room.status}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
