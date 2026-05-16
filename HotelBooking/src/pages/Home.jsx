import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import {
    Star, BedDouble, Users, ArrowRight, Wifi, Wind, Coffee,
    Monitor, Car, Dumbbell, Waves, UtensilsCrossed, CheckCircle, Clock,
} from "lucide-react";

const AMENITIES = [
    { icon: <Wifi size={22} />, label: 'Free WiFi' },
    { icon: <Wind size={22} />, label: 'Air Conditioning' },
    { icon: <Coffee size={22} />, label: 'Breakfast Included' },
    { icon: <Monitor size={22} />, label: 'Smart TV' },
    { icon: <Car size={22} />, label: 'Free Parking' },
    { icon: <Dumbbell size={22} />, label: 'Fitness Center' },
    { icon: <Waves size={22} />, label: 'Swimming Pool' },
    { icon: <UtensilsCrossed size={22} />, label: 'Restaurant' },
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
                <Star key={i} size={16} className="fill-gold text-gold" />
            ))}
        </div>
    );

    return (
        <div>
            {/* Hero */}
            <section className="relative min-h-[88vh] flex items-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/75 to-foreground/20" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="text-primary font-semibold text-xs tracking-[0.2em] uppercase">
                                {loading ? '·' : hotel?.stars ? `${hotel.stars}-Star Hotel` : 'Luxury Hotel'}
                            </span>
                        </div>

                        <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-5">
                            {loading ? '...' : (hotel?.name || 'Grand Luxe Hotel')}
                        </h1>

                        {!loading && renderStars(hotel?.stars || 5)}

                        <p className="text-white/65 text-xl mt-6 mb-10 leading-relaxed max-w-xl">
                            {hotel?.description?.slice(0, 140) || 'Experience unparalleled luxury and comfort in the heart of the city. Your perfect stay awaits.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate('/rooms')}
                                className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-primary text-white font-bold text-base rounded-2xl hover:bg-primary-light transition-colors shadow-warm cursor-pointer"
                            >
                                Book Your Stay <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={() => navigate('/about')}
                                className="inline-flex items-center justify-center gap-2 px-9 py-4 bg-white/10 text-white font-semibold text-base rounded-2xl border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                            >
                                Our Story
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-6 mt-12 text-white/55 text-sm">
                            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-primary" /> Free Cancellation</span>
                            <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> 24/7 Concierge</span>
                            <span className="flex items-center gap-2"><Star size={14} className="fill-gold text-gold" /> Best Price Guarantee</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Room Types */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">Accommodations</p>
                        <h2 className="font-display text-4xl font-bold text-foreground">Our Room Types</h2>
                        <p className="text-muted-foreground mt-2">Carefully designed spaces for your comfort</p>
                    </div>
                    <Link to="/rooms" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-sm font-semibold group">
                        View all rooms <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <div key={i} className="h-[420px] bg-muted rounded-3xl animate-pulse" />)}
                    </div>
                ) : roomTypes.length === 0 ? (
                    <div className="text-center py-20 bg-muted rounded-3xl border border-border">
                        <p className="text-muted-foreground font-medium">No room types available yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roomTypes.map(roomType => (
                            <div
                                key={roomType.uuid || roomType.id}
                                className="bg-card rounded-3xl overflow-hidden shadow-warm hover:-translate-y-1 hover:shadow-warm-lg transition-all duration-300 group border border-border"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'}
                                        alt={roomType.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className="text-primary text-xs font-bold uppercase tracking-wider mb-0.5">{roomType.name}</p>
                                    <div className="flex flex-wrap gap-3 mt-2 mb-4 text-sm text-muted-foreground">
                                        {roomType.max_guests && (
                                            <span className="flex items-center gap-1.5">
                                                <Users size={13} className="text-primary" /> Up to {roomType.max_guests} guests
                                            </span>
                                        )}
                                        {roomType.bed_type && (
                                            <span className="flex items-center gap-1.5">
                                                <BedDouble size={13} className="text-primary" /> {roomType.bed_type}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div>
                                            <span className="font-display text-2xl font-bold text-primary">${roomType.price_per_night}</span>
                                            <span className="text-muted-foreground text-sm"> / night</span>
                                        </div>
                                        <Link
                                            to="/rooms"
                                            className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors text-sm"
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

            {/* Amenities */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-card rounded-3xl p-10 md:p-16 shadow-warm border border-border">
                        <div className="text-center mb-12">
                            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">What We Offer</p>
                            <h2 className="font-display text-4xl font-bold text-foreground">Hotel Amenities</h2>
                            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                                Every detail considered to make your stay exceptional
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {AMENITIES.map((amenity, index) => (
                                <div key={index} className="flex flex-col items-center gap-3 p-5 bg-muted rounded-2xl hover:bg-accent transition-colors group cursor-default">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        {amenity.icon}
                                    </div>
                                    <span className="font-semibold text-secondary text-sm text-center">{amenity.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Story / CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-3">Our Story</p>
                        <h2 className="font-display text-4xl font-bold text-foreground mb-6">
                            {hotel?.name || 'A Place Like No Other'}
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            {hotel?.description || "Nestled in a prime location, our hotel combines timeless elegance with modern comforts. Whether you're here for business or leisure, we offer tailored experiences, world-class dining, and spaces designed to make every moment memorable."}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => navigate('/rooms')}
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-2xl hover:bg-primary-light transition-colors shadow-warm-sm cursor-pointer"
                            >
                                Book Your Stay
                            </button>
                            <button
                                onClick={() => navigate('/about')}
                                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground font-semibold rounded-2xl hover:bg-muted transition-colors cursor-pointer"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"
                            alt="Hotel interior"
                            className="w-full h-80 lg:h-[420px] object-cover rounded-3xl shadow-warm-lg"
                        />
                        <div className="absolute -bottom-5 -left-5 bg-card rounded-2xl p-5 shadow-warm border border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center">
                                    <Star size={18} className="fill-gold text-gold" />
                                </div>
                                <div>
                                    <p className="font-bold text-foreground text-sm">Outstanding</p>
                                    <p className="text-muted-foreground text-xs">5-star rated experience</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
