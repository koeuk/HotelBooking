import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import {
  BedDouble,
  Users,
  Maximize2,
  Wifi,
  Wind,
  Coffee,
  Monitor,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Hash,
  Layers,
  BadgeCheck,
} from "lucide-react";

const STATUS_COLORS = {
  available:   "bg-green-50 text-green-700",
  booked: "bg-amber-100 text-amber-700",
  maintenance: "bg-red-100 text-red-700",
  cleaning: "bg-blue-100 text-blue-700",
};

const AMENITY_ICON_MAP = {
  wifi: <Wifi size={18} />,
  ac: <Wind size={18} />,
  breakfast: <Coffee size={18} />,
  tv: <Monitor size={18} />,
};

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomType, setRoomType] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rtRes, roomsRes] = await Promise.all([
          api.get(`/room-types/${id}`),
          api
            .get(`/rooms`, { params: { room_type_id: id } })
            .catch(() => ({ data: { data: [] } })),
        ]);
        setRoomType(rtRes.data.data || rtRes.data);
        const roomData = roomsRes.data.data || roomsRes.data || [];
        setRooms(Array.isArray(roomData) ? roomData : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
      </div>
    );
  }

  if (!roomType) {
    return (
      <div className="text-center py-20 text-white/70">
        <p className="text-xl font-semibold">Room type not found</p>
        <button
          onClick={() => navigate("/rooms")}
          className="mt-4 text-white/60 hover:text-white underline cursor-pointer"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  const images = roomType.images?.length
    ? roomType.images
    : ["https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200"];

  const firstAvailableRoom = rooms.find((r) => r.status === "available");

  return (
    <div className="min-h-screen pb-24">
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <button
          onClick={() => navigate("/rooms")}
          className="flex items-center gap-2 text-white/70 hover:text-white font-medium transition-colors cursor-pointer"
        >
          <ChevronLeft size={20} />
          Back to Rooms
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-200 shadow-2xl">
              <div className="aspect-[16/9]">
                <img
                  src={images[activeImage]}
                  alt={`${roomType.name} - image ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage(
                        (i) => (i - 1 + images.length) % images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveImage((i) => (i + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === activeImage ? "bg-white w-6" : "bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${idx === activeImage ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {roomType.name}
              </h1>

              <div className="flex flex-wrap gap-3 mt-4 mb-6">
                {roomType.max_guests && (
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full text-slate-600 text-sm">
                    <Users size={16} className="text-green-800" />
                    <span>Up to {roomType.max_guests} guests</span>
                  </div>
                )}
                {roomType.bed_type && (
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full text-slate-600 text-sm">
                    <BedDouble size={16} className="text-green-800" />
                    <span>{roomType.bed_type} Bed</span>
                  </div>
                )}
                {roomType.size_sqm && (
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full text-slate-600 text-sm">
                    <Maximize2 size={16} className="text-green-800" />
                    <span>{roomType.size_sqm} m²</span>
                  </div>
                )}
              </div>

              {roomType.description && (
                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  {roomType.description}
                </p>
              )}

              {/* Amenities */}
              {roomType.amenities?.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {roomType.amenities.map((amenity, idx) => {
                      const name = amenity?.name || amenity;
                      const icon = AMENITY_ICON_MAP[
                        amenity?.icon?.toLowerCase()
                      ] || <CheckCircle2 size={18} />;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                        >
                          <div className="text-green-800">{icon}</div>
                          <span className="text-slate-700 text-sm font-medium">
                            {name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Available Rooms */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Available Rooms
              </h2>
              {rooms.length === 0 ? (
                <p className="text-slate-400 text-center py-10">
                  No rooms data available.
                </p>
              ) : (
                <div className="space-y-3">
                  {rooms.map((room) => (
                    <div
                      key={room.uuid || room.id}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                          <Hash size={16} className="text-green-800" />
                          Room {room.room_number}
                        </div>
                        {room.floor && (
                          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                            <Layers size={14} />
                            Floor {room.floor}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[room.status] || STATUS_COLORS.available}`}
                        >
                          {room.status || "available"}
                        </span>
                        {room.status === "available" && (
                          <button
                            onClick={() =>
                              navigate(`/book/${room.uuid || room.id}`)
                            }
                            className="text-xs font-bold px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
                          >
                            Book
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl sticky top-28">
              <div className="mb-6">
                <span className="text-4xl font-bold text-green-800">
                  ${roomType.price_per_night}
                </span>
                <span className="text-slate-400"> / night</span>
              </div>

              <div className="space-y-3 mb-6 text-sm text-slate-600">
                {roomType.max_guests && (
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-green-800" />
                    <span>Up to {roomType.max_guests} guests</span>
                  </div>
                )}
                {roomType.bed_type && (
                  <div className="flex items-center gap-2">
                    <BedDouble size={15} className="text-green-800" />
                    <span>{roomType.bed_type} Bed</span>
                  </div>
                )}
                {roomType.size_sqm && (
                  <div className="flex items-center gap-2">
                    <Maximize2 size={15} className="text-green-800" />
                    <span>{roomType.size_sqm} m²</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (firstAvailableRoom) {
                    navigate(
                      `/book/${firstAvailableRoom.uuid || firstAvailableRoom.id}`,
                    );
                  } else {
                    const firstRoom = rooms[0];
                    if (firstRoom)
                      navigate(`/book/${firstRoom.uuid || firstRoom.id}`);
                  }
                }}
                disabled={rooms.length === 0}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-40 transition-all shadow-lg shadow-primary/25 cursor-pointer"
              >
                Book Now
              </button>

              {!firstAvailableRoom && rooms.length > 0 && (
                <p className="text-center text-xs text-amber-600 mt-3">
                  No rooms currently available
                </p>
              )}

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BadgeCheck size={15} className="text-green-800" />
                  <span>Free cancellation up to 24h before</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BadgeCheck size={15} className="text-green-800" />
                  <span>Best price guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
