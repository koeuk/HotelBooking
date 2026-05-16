import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { MapPin, Star, Wifi, Coffee, Wind, Monitor, CheckCircle2, ChevronRight, Hotel as HotelIcon } from 'lucide-react';

export default function HotelDetails() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hotelRes, roomsRes] = await Promise.all([
                    api.get(`/hotels/${id}`),
                    api.get(`/hotels/${id}/room-types`)
                ]);
                setHotel(hotelRes.data.data);
                setRoomTypes(roomsRes.data.data);
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!hotel) return <div className="text-center py-20">Hotel not found</div>;

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <img 
                    src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-sm font-medium border border-white/30">
                                Luxury Stay
                            </div>
                            <div className="flex items-center text-amber-400 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                                <Star size={16} fill="currentColor" />
                                <span className="ml-1 text-sm font-bold text-white">{hotel.rating || '4.8'}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{hotel.name}</h1>
                        <div className="flex items-center text-white/90 gap-2">
                            <MapPin size={20} className="text-primary" />
                            <span className="text-lg">{hotel.address}, {hotel.city}, {hotel.country}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">About this hotel</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {hotel.description || 'Experience world-class service and unparalleled comfort in the heart of the city. Our hotel features modern amenities and elegant design, perfect for both business and leisure travelers.'}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Common Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: <Wifi size={20} />, label: 'Free WiFi' },
                                { icon: <Coffee size={20} />, label: 'Breakfast' },
                                { icon: <Wind size={20} />, label: 'AC' },
                                { icon: <Monitor size={20} />, label: 'Smart TV' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="text-primary">{item.icon}</div>
                                    <span className="font-medium text-slate-700">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Available Rooms</h2>
                        <div className="space-y-6">
                            {roomTypes.map(room => (
                                <div key={room.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 hover:shadow-md transition-shadow">
                                    <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden bg-slate-100">
                                        <img 
                                            src={room.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427'} 
                                            alt={room.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{room.name}</h3>
                                        <p className="text-slate-500 mb-6">{room.description}</p>
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <CheckCircle2 size={16} className="text-green-500" />
                                                <span>Up to {room.max_users} persons</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <CheckCircle2 size={16} className="text-green-500" />
                                                <span>King Size Bed</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-3xl font-bold text-primary">${room.price_per_night}</span>
                                                <span className="text-slate-400 font-medium"> / night</span>
                                            </div>
                                            <button 
                                                onClick={() => navigate(`/book/${room.uuid}`)}
                                                className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                                            >
                                                Select Room
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl sticky top-28">
                        <h3 className="text-xl font-bold text-slate-900 mb-6">Location Highlights</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                    <HotelIcon size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">Perfect Location</p>
                                    <p className="text-slate-500 text-sm">Right in the heart of {hotel.city}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500">Need help?</span>
                                <a href="tel:+" className="text-primary font-bold">Call Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
