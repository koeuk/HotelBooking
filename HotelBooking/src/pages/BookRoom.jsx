import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, ChevronLeft, Info, CheckCircle, AlertCircle, Users, BedDouble, MessageSquare } from 'lucide-react';

export default function BookRoom() {
    const { roomUuid } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        check_in_date: '',
        check_out_date: '',
        guests: 1,
        special_requests: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        api.get(`/rooms/${roomUuid}`)
            .then(res => {
                setRoom(res.data.data || res.data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [roomUuid, user, navigate]);

    const calculateNights = () => {
        if (!bookingData.check_in_date || !bookingData.check_out_date) return 0;
        const start = new Date(bookingData.check_in_date);
        const end = new Date(bookingData.check_out_date);
        const diff = end - start;
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        const nights = calculateNights();
        if (nights <= 0) {
            setError('Check-out date must be after check-in date');
            setSubmitting(false);
            return;
        }

        try {
            await api.post('/bookings', {
                room_uuid: roomUuid,
                check_in_date: bookingData.check_in_date,
                check_out_date: bookingData.check_out_date,
                guests: bookingData.guests,
                special_requests: bookingData.special_requests || undefined,
            });
            navigate('/dashboard', { state: { message: 'Booking created successfully!' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
        </div>
    );
    if (!room) return <div className="text-center py-20 text-white/70 text-xl">Room not found</div>;

    const roomType = room.room_type || {};
    const nights = calculateNights();
    const pricePerNight = roomType.price_per_night || 0;
    const totalPrice = nights * pricePerNight;
    const maxGuests = roomType.max_guests || 4;

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/70 hover:text-white mb-8 font-medium transition-colors cursor-pointer"
                >
                    <ChevronLeft size={20} />
                    Back to Room
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Calendar className="text-primary" />
                                Complete Your Booking
                            </h2>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3">
                                    <AlertCircle size={20} />
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleBooking} className="space-y-6">
                                {/* Dates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Check-in Date</label>
                                        <input
                                            type="date"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={bookingData.check_in_date}
                                            onChange={e => setBookingData(d => ({ ...d, check_in_date: e.target.value }))}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Check-out Date</label>
                                        <input
                                            type="date"
                                            required
                                            min={bookingData.check_in_date || new Date().toISOString().split('T')[0]}
                                            value={bookingData.check_out_date}
                                            onChange={e => setBookingData(d => ({ ...d, check_out_date: e.target.value }))}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <Users size={16} className="text-primary" />
                                        Number of Guests
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min={1}
                                        max={maxGuests}
                                        value={bookingData.guests}
                                        onChange={e => setBookingData(d => ({ ...d, guests: parseInt(e.target.value) || 1 }))}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                    <p className="text-xs text-slate-400 mt-1">Maximum {maxGuests} guests for this room</p>
                                </div>

                                {/* Special Requests */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <MessageSquare size={16} className="text-primary" />
                                        Special Requests <span className="text-slate-400 font-normal">(optional)</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Early check-in, extra pillows, dietary requirements..."
                                        value={bookingData.special_requests}
                                        onChange={e => setBookingData(d => ({ ...d, special_requests: e.target.value }))}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    />
                                </div>

                                {/* Info box */}
                                <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10">
                                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <Info size={16} className="text-primary" />
                                        Important Information
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle size={15} className="text-green-500" />
                                            Free cancellation until 24h before check-in
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle size={15} className="text-green-500" />
                                            Check-in: 2:00 PM · Check-out: 12:00 PM
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting || nights === 0}
                                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/25 cursor-pointer"
                                >
                                    {submitting ? 'Confirming...' : `Confirm Booking — $${totalPrice || 0}`}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-7 shadow-xl">
                            <h3 className="text-xl font-bold text-slate-900 mb-5">Booking Summary</h3>

                            <div className="flex gap-4 mb-5">
                                <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0">
                                    <img
                                        src={roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200'}
                                        alt={roomType.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{roomType.name || 'Room'}</p>
                                    <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
                                        <BedDouble size={14} className="text-primary" />
                                        <span>Room {room.room_number}</span>
                                    </div>
                                    {room.floor && (
                                        <p className="text-slate-400 text-xs mt-0.5">Floor {room.floor}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 pt-5 border-t border-slate-100">
                                <div className="flex justify-between text-slate-600 text-sm">
                                    <span>${pricePerNight} × {nights || 0} night{nights !== 1 ? 's' : ''}</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 text-sm">
                                    <span>Service Fee</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-slate-100 text-lg font-bold text-slate-900">
                                    <span>Total</span>
                                    <span className="text-primary">${totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
