import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { Button } from '../components/ui/button';
import {
    Star,
    BedDouble,
    Users,
    ArrowRight,
    Wifi,
    Wind,
    Coffee,
    Monitor,
    Car,
    Dumbbell,
    Waves,
    UtensilsCrossed,
    Sparkles,
    CheckCircle,
    Clock,
} from "lucide-react";

const AMENITIES = [
    { icon: <Wifi size={24} />, label: 'Free WiFi' },
    { icon: <Wind size={24} />, label: 'Air Conditioning' },
    { icon: <Coffee size={24} />, label: 'Breakfast Included' },
    { icon: <Monitor size={24} />, label: 'Smart TV' },
    { icon: <Car size={24} />, label: 'Free Parking' },
    { icon: <Dumbbell size={24} />, label: 'Fitness Center' },
    { icon: <Waves size={24} />, label: 'Swimming Pool' },
    { icon: <UtensilsCrossed size={24} />, label: 'Restaurant' },
];

export default function Home() {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/hotel').catch(() => ({ data: { data: null } })),
            api.get('/room-types').catch(() => ({ data: { data: [] } })),
        ]).then(([hotelRes, roomTypesRes]) => {
            setHotel(hotelRes.data.data || hotelRes.data);
            const types = roomTypesRes.data.data || roomTypesRes.data || [];
            setRoomTypes(Array.isArray(types) ? types.slice(0, 3) : []);
        }).finally(() => setLoading(false));
    }, []);

    const renderStars = (count = 5) => (
        <div className="flex gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
            ))}
        </div>
    );

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles size={18} className="text-amber-400" />
                            <span className="text-white/80 font-medium text-sm tracking-wide uppercase">
                                {loading ? 'Welcome' : (hotel?.stars ? `${hotel.stars}-Star Hotel` : 'Luxury Hotel')}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
                            {loading ? 'Loading...' : (hotel?.name || 'Grand Luxe Hotel')}
                        </h1>

                        {!loading && renderStars(hotel?.stars || 5)}

                        <p className="text-white/80 text-xl mt-6 mb-10 leading-relaxed max-w-xl">
                            {hotel?.tagline || hotel?.description?.slice(0, 120) || 'Experience unparalleled luxury and comfort in the heart of the city. Your perfect stay awaits.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => navigate('/rooms')}
                                className="px-10 py-4 bg-white text-primary font-bold text-lg rounded-2xl hover:bg-white/90 transition-all shadow-lg cursor-pointer"
                            >
                                Book Now
                                <ArrowRight size={20} className="ml-2" />
                            </Button>
                            <Button
                                onClick={() => navigate('/about')}
                                className="px-10 py-4 bg-white/10 text-white font-bold text-lg rounded-2xl border border-white/30 hover:bg-white/20 transition-all cursor-pointer"
                            >
                                Learn More
                            </Button>
                        </div>

                        <div className="flex flex-wrap gap-6 mt-12 text-white/70 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-400" />
                                <span>Free Cancellation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-sky-400" />
                                <span>24/7 Concierge</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star size={16} className="text-amber-400 fill-amber-400" />
                                <span>Best Price Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Room Types Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-2">Accommodations</p>
                        <h2 className="text-4xl font-bold text-white">Our Room Types</h2>
                        <p className="text-white/60 mt-2 text-lg">Carefully designed spaces for your comfort</p>
                    </div>
                    <Link to="/rooms" className="group flex items-center gap-2 text-white/80 font-bold text-lg hover:text-white hover:gap-3 transition-all">
                        View all rooms <ArrowRight size={20} />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[420px] bg-white/10 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : roomTypes.length === 0 ? (
                    <div className="text-center py-20 bg-white/10 rounded-3xl">
                        <p className="text-white/60 font-medium">No room types available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roomTypes.map(roomType => (
                            <div key={roomType.uuid || roomType.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'}
                                        alt={roomType.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{roomType.name}</h3>
                                    <div className="flex flex-wrap gap-3 mt-3 mb-4 text-sm text-slate-500">
                                        {roomType.max_guests && (
                                            <div className="flex items-center gap-1.5">
                                                <Users size={15} className="text-primary" />
                                                <span>Up to {roomType.max_guests} guests</span>
                                            </div>
                                        )}
                                        {roomType.bed_type && (
                                            <div className="flex items-center gap-1.5">
                                                <BedDouble size={15} className="text-primary" />
                                                <span>{roomType.bed_type}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <span className="text-2xl font-bold text-primary">${roomType.price_per_night}</span>
                                            <span className="text-slate-400 text-sm"> / night</span>
                                        </div>
                                        <Link
                                            to={`/rooms/${roomType.uuid || roomType.id}`}
                                            className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm cursor-pointer"
                                        >
                                            View Rooms
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Amenities Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/95 rounded-3xl p-10 md:p-16 shadow-xl">
                        <div className="text-center mb-12">
                            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">What We Offer</p>
                            <h2 className="text-4xl font-bold text-slate-900">Hotel Amenities</h2>
                            <p className="text-slate-500 mt-3 text-lg max-w-xl mx-auto">
                                Every detail considered to make your stay exceptional
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            {AMENITIES.map((amenity, index) => (
                                <div key={index} className="flex flex-col items-center gap-3 p-5 bg-slate-50 rounded-2xl hover:bg-primary/5 transition-colors group">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        {amenity.icon}
                                    </div>
                                    <span className="font-semibold text-slate-700 text-sm text-center">{amenity.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About / CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">About Us</p>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            {hotel?.name || 'A Place Like No Other'}
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8">
                            {hotel?.description || 'Nestled in a prime location, our hotel combines timeless elegance with modern comforts. Whether you\'re here for business or leisure, we offer tailored experiences, world-class dining, and spaces designed to make every moment memorable.'}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                onClick={() => navigate('/rooms')}
                                className="px-8 py-3.5 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all shadow-lg cursor-pointer"
                            >
                                Book Your Stay
                            </Button>
                            <Button
                                onClick={() => navigate('/about')}
                                className="px-8 py-3.5 bg-transparent text-white font-bold rounded-2xl border border-white/30 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                Our Story
                            </Button>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
                            alt="Hotel interior"
                            className="w-full h-80 lg:h-[420px] object-cover rounded-3xl shadow-2xl"
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Star size={20} className="fill-amber-400 text-amber-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">Outstanding</p>
                                    <p className="text-slate-400 text-xs">5-star rated experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
