import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { CalendarDays, MapPin, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react';

const STATUS_STYLES = {
    confirmed: 'bg-green-100 text-green-700',
    pending:   'bg-amber-100 text-amber-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-slate-100 text-slate-600',
};

const STATUS_ICONS = {
    confirmed: <CheckCircle size={14} />,
    pending:   <Clock size={14} />,
    cancelled: <XCircle size={14} />,
    completed: <CheckCircle size={14} />,
};

export default function UserDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/bookings')
            .then(res => setBookings(res.data.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
                        <p className="text-slate-500">{user?.email}</p>
                    </div>
                </div>

                {/* Bookings */}
                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-6">My Bookings</h2>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                            <CalendarDays size={40} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-500 font-medium">No bookings yet.</p>
                            <p className="text-slate-400 text-sm mt-1">Start by browsing our hotels.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map(booking => (
                                <div key={booking.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                        <img
                                            src={booking.room?.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427'}
                                            alt="Room"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 flex-wrap mb-3">
                                            <div>
                                                <h3 className="font-bold text-slate-900">{booking.room?.name || 'Room'}</h3>
                                                <div className="flex items-center text-slate-500 text-sm mt-1">
                                                    <MapPin size={14} className="mr-1" />
                                                    <span>{booking.hotel?.name || '—'}</span>
                                                </div>
                                            </div>
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[booking.status] || STATUS_STYLES.pending}`}>
                                                {STATUS_ICONS[booking.status]}
                                                {booking.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <CalendarDays size={14} />
                                                <span>{booking.check_in} → {booking.check_out}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <CreditCard size={14} />
                                                <span className="font-semibold text-slate-700">${booking.total_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
