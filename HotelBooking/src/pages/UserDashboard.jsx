import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  CalendarDays,
  BedDouble,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Bookmark,
  Trash2,
  Layers,
  LayoutDashboard,
  ShoppingCart,
  Heart,
} from "lucide-react";

const STATUS_STYLES = {
  confirmed:   "bg-green-100 text-green-700 border-green-200",
  pending:     "bg-amber-100 text-amber-700 border-amber-200",
  cancelled:   "bg-red-100 text-red-700 border-red-200",
  completed:   "bg-muted text-muted-foreground border-border",
  checked_in:  "bg-blue-100 text-blue-700 border-blue-200",
  checked_out: "bg-muted text-muted-foreground border-border",
};

const STATUS_ICONS = {
  confirmed:   <CheckCircle size={12} />,
  pending:     <Clock size={12} />,
  cancelled:   <XCircle size={12} />,
  completed:   <CheckCircle size={12} />,
  checked_in:  <CheckCircle size={12} />,
  checked_out: <CheckCircle size={12} />,
};

export default function UserDashboard() {
  const { user } = useAuth();
  const { cartIds, toggleCart } = useCart();
  const [bookings, setBookings] = useState([]);
  const [saved, setSaved] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);
  const [tab, setTab] = useState("bookings");

  useEffect(() => {
    api.get("/bookings")
      .then(res => setBookings(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoadingBookings(false));

    api.get("/favorites")
      .then(async (res) => {
        const ids = res.data.data || [];
        if (ids.length === 0) { setSaved([]); return; }
        const roomTypesRes = await api.get("/room-types");
        const all = roomTypesRes.data.data || [];
        setSaved(all.filter(rt => ids.includes(rt.id)));
      })
      .catch(console.error)
      .finally(() => setLoadingSaved(false));

    api.get("/wishlist")
      .then(res => setCart(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoadingCart(false));
  }, []);

  const removeFromSaved = async (roomTypeId) => {
    await api.delete(`/favorites/${roomTypeId}`);
    setSaved(prev => prev.filter(rt => rt.id !== roomTypeId));
  };

  const removeFromCart = async (roomTypeId) => {
    await toggleCart(roomTypeId);
    setCart(prev => prev.filter(rt => rt.id !== roomTypeId));
  };

  const tabs = [
    { id: "bookings", label: "My Bookings", icon: <LayoutDashboard size={14} />, count: bookings.length },
    { id: "saved",    label: "Saved",       icon: <Heart size={14} />,           count: saved.length },
    { id: "cart",     label: "Cart",        icon: <ShoppingCart size={14} />,    count: cartIds.size },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-warm mb-8 flex items-center gap-5">
          <div className="text-green-800 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center font-display font-bold text-2xl shrink-0">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Welcome back, {user?.name?.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">{user?.email}</p>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-muted rounded-xl p-1">
            <div className="text-center px-4 py-2 rounded-lg bg-card shadow-warm-sm">
              <p className="font-bold text-foreground text-lg leading-none">{bookings.length}</p>
              <p className="text-muted-foreground text-xs mt-0.5">Bookings</p>
            </div>
            <div className="text-center px-4 py-2">
              <p className="font-bold text-foreground text-lg leading-none">{saved.length}</p>
              <p className="text-muted-foreground text-xs mt-0.5">Saved</p>
            </div>
            <div className="text-center px-4 py-2">
              <p className="font-bold text-foreground text-lg leading-none">{cartIds.size}</p>
              <p className="text-muted-foreground text-xs mt-0.5">Cart</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-xl p-1 mb-8 w-fit">
          {tabs.map(({ id, label, icon, count }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                tab === id
                  ? "bg-card text-foreground shadow-warm-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {icon}
              {label}
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  tab === id ? "bg-primary/10 text-green-800" : "bg-border text-muted-foreground"
                }`}>
                  {count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {tab === "bookings" && (
          <div>
            {loadingBookings ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-28 bg-muted rounded-2xl animate-pulse border border-border" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-warm-sm">
                <CalendarDays size={40} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-foreground font-semibold">No bookings yet</p>
                <p className="text-muted-foreground text-sm mt-1">Browse our rooms and make your first booking.</p>
                <Link to="/rooms" className="inline-block mt-5 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-light transition-colors">
                  Browse Rooms
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="bg-card rounded-2xl border border-border shadow-warm-sm p-5 flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img
                        src={booking.room?.room_type?.images?.[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300"}
                        alt="Room"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                        <div>
                          <h3 className="font-bold text-foreground">{booking.room?.room_type?.name || "Room"}</h3>
                          <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1 flex-wrap">
                            <span className="flex items-center gap-1">
                              <BedDouble size={12} className="text-green-800" />
                              Room {booking.room?.room_number || "—"}
                            </span>
                            {booking.room?.floor && (
                              <span className="flex items-center gap-1">
                                <Layers size={12} className="text-green-800" />
                                Floor {booking.room.floor}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize border ${STATUS_STYLES[booking.status] || STATUS_STYLES.pending}`}>
                          {STATUS_ICONS[booking.status] || STATUS_ICONS.pending}
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} className="text-green-800" />
                          {booking.check_in_date || booking.check_in} → {booking.check_out_date || booking.check_out}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CreditCard size={12} className="text-green-800" />
                          <span className="font-semibold text-foreground">${booking.total_price}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Saved Tab */}
        {tab === "saved" && (
          <div>
            {loadingSaved ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-52 bg-muted rounded-2xl animate-pulse border border-border" />
                ))}
              </div>
            ) : saved.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-warm-sm">
                <Heart size={40} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-foreground font-semibold">No saved rooms yet</p>
                <p className="text-muted-foreground text-sm mt-1">Tap the heart icon on any room to save it here.</p>
                <Link to="/rooms" className="inline-block mt-5 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-light transition-colors">
                  Browse Rooms
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {saved.map(roomType => (
                  <div key={roomType.id} className="bg-card rounded-2xl border border-border shadow-warm-sm overflow-hidden group hover:-translate-y-0.5 hover:shadow-warm transition-all duration-300">
                    <Link to={`/rooms/${roomType.uuid || roomType.id}`}>
                      <div className="h-36 overflow-hidden">
                        <img
                          src={roomType.images?.[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"}
                          alt={roomType.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-green-800 text-xs font-bold uppercase tracking-wide mb-0.5">{roomType.name}</p>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1 flex-wrap">
                          {roomType.bed_type && (
                            <span className="flex items-center gap-1">
                              <BedDouble size={11} className="text-green-800" /> {roomType.bed_type}
                            </span>
                          )}
                          {roomType.price_per_night && (
                            <span className="text-green-800 font-semibold">${roomType.price_per_night}/night</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => removeFromSaved(roomType.id)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} /> Remove from saved
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Cart Tab */}
        {tab === "cart" && (
          <div>
            {loadingCart ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-52 bg-muted rounded-2xl animate-pulse border border-border" />
                ))}
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20 bg-card rounded-3xl border border-border shadow-warm-sm">
                <ShoppingCart size={40} className="mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-foreground font-semibold">Your cart is empty</p>
                <p className="text-muted-foreground text-sm mt-1">Add rooms to your cart while browsing.</p>
                <Link to="/rooms" className="inline-block mt-5 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-light transition-colors">
                  Browse Rooms
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {cart.map(roomType => (
                  <div key={roomType.id} className="bg-card rounded-2xl border border-border shadow-warm-sm overflow-hidden group hover:-translate-y-0.5 hover:shadow-warm transition-all duration-300">
                    <Link to={`/rooms/${roomType.uuid || roomType.id}`}>
                      <div className="h-36 overflow-hidden">
                        <img
                          src={roomType.images?.[0] || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400"}
                          alt={roomType.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-green-800 text-xs font-bold uppercase tracking-wide mb-0.5">{roomType.name}</p>
                        <div className="flex items-center gap-3 text-muted-foreground text-sm mt-1 flex-wrap">
                          {roomType.bed_type && (
                            <span className="flex items-center gap-1">
                              <BedDouble size={11} className="text-green-800" /> {roomType.bed_type}
                            </span>
                          )}
                          {roomType.price_per_night && (
                            <span className="text-green-800 font-semibold">${roomType.price_per_night}/night</span>
                          )}
                        </div>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => removeFromCart(roomType.id)}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-red-500 font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} /> Remove from cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
