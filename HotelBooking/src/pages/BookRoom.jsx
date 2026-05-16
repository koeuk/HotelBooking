import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, CreditCard, ChevronLeft, Info, CheckCircle, AlertCircle } from 'lucide-react';

export default function BookRoom() {
    const { roomUuid } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [roomType, setRoomType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState({
        check_in_date: '',
        check_out_date: '',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        api.get(`/room-types/${roomUuid}`)
            .then(res => setRoomType(res.data.data))
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
            const res = await api.post('/bookings', {
                room_type_uuid: roomUuid,
                check_in_date: bookingData.check_in_date,
                check_out_date: bookingData.check_out_date,
            });
            navigate('/dashboard', { state: { message: 'Booking created successfully!' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (!roomType) return <div className="text-center py-20">Room type not found</div>;

    const nights = calculateNights();
    const totalPrice = nights * roomType.price_per_night;

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 font-medium transition-colors"
                >
                    <ChevronLeft size={20} />
                    Back to Hotel
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Calendar className="text-primary" />
                                Select Dates
                            </h2>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3">
                                    <AlertCircle size={20} />
                                    <p className="text-sm font-medium">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleBooking} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Check-in Date</label>
                                        <input 
                                            type="date" 
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setBookingData({...bookingData, check_in_date: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Check-out Date</label>
                                        <input 
                                            type="date" 
                                            required
                                            min={bookingData.check_in_date || new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setBookingData({...bookingData, check_out_date: e.target.value})}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Info size={18} className="text-primary" />
                                        Important Information
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle size={16} className="text-green-500" />
                                            Free cancellation until 24h before check-in
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle size={16} className="text-green-500" />
                                            Check-in: 2:00 PM, Check-out: 12:00 PM
                                        </li>
                                    </ul>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={submitting || nights === 0}
                                    className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-primary/25"
                                >
                                    {submitting ? 'Confirming...' : `Confirm Booking for $${totalPrice || 0}`}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Booking Summary</h3>
                            <div className="flex gap-4 mb-6">
                                <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden">
                                    <img src={roomType.images?.[0]} alt={roomType.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{roomType.name}</p>
                                    <p className="text-slate-500 text-sm">{roomType.hotel?.name}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6 border-t border-slate-100">
                                <div className="flex justify-between text-slate-600">
                                    <span>{roomType.price_per_night} x {nights} nights</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Service Fee</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between pt-4 border-t border-slate-100 text-xl font-bold text-slate-900">
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
