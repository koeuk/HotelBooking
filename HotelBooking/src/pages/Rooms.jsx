import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { BedDouble, Users, Maximize2, Wifi, Wind, Coffee, Monitor, ChevronRight, Star } from 'lucide-react';

const AMENITY_ICONS = {
    wifi:      <Wifi size={13} />,
    ac:        <Wind size={13} />,
    breakfast: <Coffee size={13} />,
    tv:        <Monitor size={13} />,
};

const BED_TYPES = ['All', 'Single', 'Double', 'Queen', 'King'];
const GUEST_OPTIONS = ['', '1', '2', '3', '4'];

export default function Rooms() {
    const navigate = useNavigate();
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ minGuests: '', maxPrice: '', bedType: 'All' });

    useEffect(() => {
        const params = {};
        if (filters.minGuests) params.min_guests = filters.minGuests;
        if (filters.maxPrice)  params.max_price  = filters.maxPrice;
        if (filters.bedType !== 'All') params.bed_type = filters.bedType;

        setLoading(true);
        api.get('/room-types', { params })
            .then(res => {
                const data = res.data.data || res.data || [];
                setRoomTypes(Array.isArray(data) ? data : []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [filters]);

    const clearFilters = () => setFilters({ minGuests: '', maxPrice: '', bedType: 'All' });
    const isFiltered = filters.minGuests || filters.maxPrice || filters.bedType !== 'All';

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="py-16 px-4 text-center">
                <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-3">Accommodations</p>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">Our Rooms</h1>
                <p className="text-white/60 text-lg max-w-lg mx-auto">
                    Choose from our carefully curated selection of rooms and suites
                </p>
            </div>

            {/* Filter Bar */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 p-2 flex flex-wrap gap-2 items-center">

                    {/* Bed type pills */}
                    <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                        {BED_TYPES.map(t => (
                            <button
                                key={t}
                                onClick={() => setFilters(f => ({ ...f, bedType: t }))}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                                    filters.bedType === t
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {t === 'All' ? 'All Beds' : `${t} Bed`}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />

                    {/* Guests select */}
                    <div className="flex flex-col min-w-[110px]">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1">Guests</label>
                        <select
                            value={filters.minGuests}
                            onChange={e => setFilters(f => ({ ...f, minGuests: e.target.value }))}
                            className="px-3 pb-1.5 bg-transparent text-slate-700 text-sm font-semibold focus:outline-none cursor-pointer"
                        >
                            <option value="">Any</option>
                            {['1','2','3','4'].map(n => (
                                <option key={n} value={n}>{n}+ guests</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block" />

                    {/* Max price input */}
                    <div className="flex flex-col min-w-[120px]">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-1">Max Price</label>
                        <div className="flex items-center px-3 pb-1.5">
                            <span className="text-slate-400 text-sm font-semibold mr-1">$</span>
                            <input
                                type="number"
                                placeholder="Any"
                                value={filters.maxPrice}
                                onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
                                className="bg-transparent text-slate-700 text-sm font-semibold w-full focus:outline-none"
                                min={0}
                            />
                        </div>
                    </div>

                    {/* Clear */}
                    {isFiltered && (
                        <button
                            onClick={clearFilters}
                            className="ml-auto mr-2 text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer whitespace-nowrap"
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            {/* Room Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[460px] bg-white/10 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : roomTypes.length === 0 ? (
                    <div className="text-center py-24 bg-white/10 rounded-3xl">
                        <BedDouble size={48} className="mx-auto text-white/30 mb-4" />
                        <p className="text-white/60 text-xl font-semibold">No rooms match your filters.</p>
                        <button onClick={clearFilters} className="mt-4 text-white/50 underline text-sm cursor-pointer">Clear filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roomTypes.map(roomType => (
                            <div
                                key={roomType.uuid || roomType.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 group flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'}
                                        alt={roomType.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    {/* Bed type badge */}
                                    {roomType.bed_type && (
                                        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                            {roomType.bed_type} Bed
                                        </span>
                                    )}

                                    {/* Price overlay */}
                                    <div className="absolute bottom-4 right-4 bg-primary text-white px-3 py-1.5 rounded-xl text-sm font-bold shadow-lg">
                                        ${roomType.price_per_night}<span className="font-normal opacity-80 text-xs">/night</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{roomType.name}</h3>

                                    {roomType.description && (
                                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {roomType.description}
                                        </p>
                                    )}

                                    {/* Specs */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {roomType.max_guests && (
                                            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                                                <Users size={12} className="text-primary" />
                                                Up to {roomType.max_guests} guests
                                            </span>
                                        )}
                                        {roomType.size_sqm && (
                                            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full">
                                                <Maximize2 size={12} className="text-primary" />
                                                {roomType.size_sqm} m²
                                            </span>
                                        )}
                                    </div>

                                    {/* Amenities */}
                                    {roomType.amenities?.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {roomType.amenities.slice(0, 4).map((a, i) => (
                                                <span key={i} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                                                    {AMENITY_ICONS[a?.icon?.toLowerCase()] || <Star size={11} />}
                                                    {a?.name || a}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* CTA */}
                                    <button
                                        onClick={() => navigate(`/rooms/${roomType.uuid || roomType.id}`)}
                                        className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-primary text-white font-bold rounded-2xl transition-colors duration-200 text-sm cursor-pointer group/btn"
                                    >
                                        Book This Room
                                        <ChevronRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
