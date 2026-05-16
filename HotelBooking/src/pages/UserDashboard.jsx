import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { CalendarDays, BedDouble, CreditCard, Clock, CheckCircle, XCircle, Bookmark, Trash2, Layers } from 'lucide-react';

const STATUS_STYLES = {
    confirmed:   'bg-green-50 text-green-800',
    pending:     'bg-amber-100 text-amber-700',
    cancelled:   'bg-red-100 text-red-700',
    completed:   'bg-slate-100 text-slate-600',
    checked_in:  'bg-blue-100 text-blue-700',
    checked_out: 'bg-slate-100 text-slate-600',
};

const STATUS_ICONS = {
    confirmed:   <CheckCircle size={14} />,
    pending:     <Clock size={14} />,
    cancelled:   <XCircle size={14} />,
    completed:   <CheckCircle size={14} />,
    checked_in:  <CheckCircle size={14} />,
    checked_out: <CheckCircle size={14} />,
};

export default function UserDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [loadingWishlist, setLoadingWishlist] = useState(true);

    useEffect(() => {
        api.get('/bookings')
            .then(res => setBookings(res.data.data || []))
            .catch(console.error)
            .finally(() => setLoadingBookings(false));

        api.get('/wishlist')
            .then(res => setWishlist(res.data.data || []))
            .catch(console.error)
            .finally(() => setLoadingWishlist(false));
    }, []);

    const removeFromWishlist = async (roomTypeId) => {
        await api.delete(`/wishlist/${roomTypeId}`);
        setWishlist(prev => prev.filter(rt => (rt.uuid || rt.id) !== roomTypeId));
    };

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-10 flex items-center gap-4 bg-white/95 rounded-3xl p-6 shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold shrink-0">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
                        <p className="text-slate-500">{user?.email}</p>
                    </div>
                </div>

                {/* Bookings */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-white mb-5">My Bookings</h2>

                    {loadingBookings ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-32 bg-white/10 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-16 bg-white/95 rounded-3xl shadow-lg">
                            <CalendarDays size={40} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-600 font-semibold">No bookings yet.</p>
                            <p className="text-slate-400 text-sm mt-1">Browse our rooms and make your first booking.</p>
                            <Link to="/rooms" className="inline-block mt-4 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                                Browse Rooms
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map(booking => (
                                <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row gap-5">
                                    <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                        <img
                                            src={booking.room?.room_type?.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=300'}
                                            alt="Room"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 flex-wrap mb-2">
                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    {booking.room?.room_type?.name || 'Room'}
                                                </h3>
                                                <div className="flex items-center gap-3 text-slate-500 text-sm mt-1 flex-wrap">
                                                    <span className="flex items-center gap-1">
                                                        <BedDouble size={13} className="text-primary" />
                                                        Room {booking.room?.room_number || '—'}
                                                    </span>
                                                    {booking.room?.floor && (
                                                        <span className="flex items-center gap-1">
                                                            <Layers size={13} className="text-primary" />
                                                            Floor {booking.room.floor}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[booking.status] || STATUS_STYLES.pending}`}>
                                                {STATUS_ICONS[booking.status] || STATUS_ICONS.pending}
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarDays size={13} />
                                                <span>{booking.check_in_date || booking.check_in} → {booking.check_out_date || booking.check_out}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CreditCard size={13} />
                                                <span className="font-semibold text-slate-700">${booking.total_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Wishlist / Saved Rooms */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Bookmark size={20} />
                        Saved Rooms
                        {wishlist.length > 0 && (
                            <span className="ml-1 text-sm font-semibold bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                                {wishlist.length}
                            </span>
                        )}
                    </h2>

                    {loadingWishlist ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-48 bg-white/10 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : wishlist.length === 0 ? (
                        <div className="text-center py-16 bg-white/95 rounded-3xl shadow-lg">
                            <Bookmark size={40} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-600 font-semibold">No saved rooms yet.</p>
                            <p className="text-slate-400 text-sm mt-1">Save room types while browsing to find them here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {wishlist.map(roomType => {
                                const rtId = roomType.uuid || roomType.id;
                                return (
                                    <div key={rtId} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                                        <Link to={`/rooms/${rtId}`}>
                                            <div className="h-36 overflow-hidden">
                                                <img
                                                    src={roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'}
                                                    alt={roomType.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-slate-900 truncate">{roomType.name}</h3>
                                                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1 flex-wrap">
                                                    {roomType.bed_type && (
                                                        <span className="flex items-center gap-1">
                                                            <BedDouble size={12} className="text-primary" />
                                                            {roomType.bed_type}
                                                        </span>
                                                    )}
                                                    {roomType.price_per_night && (
                                                        <span className="font-semibold text-primary">${roomType.price_per_night}/night</span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="px-4 pb-4">
                                            <button
                                                onClick={() => removeFromWishlist(rtId)}
                                                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 font-medium transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={13} />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
