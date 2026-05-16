import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { BedDouble, Users, Maximize2, Wifi, Wind, Coffee, Monitor, SlidersHorizontal } from 'lucide-react';

const AMENITY_ICONS = {
    wifi: <Wifi size={14} />,
    ac: <Wind size={14} />,
    breakfast: <Coffee size={14} />,
    tv: <Monitor size={14} />,
};

const BED_TYPES = ['All', 'Single', 'Double', 'Queen', 'King'];

export default function Rooms() {
    const navigate = useNavigate();
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        minGuests: '',
        maxPrice: '',
        bedType: 'All',
    });

    useEffect(() => {
        const params = {};
        if (filters.minGuests) params.min_guests = filters.minGuests;
        if (filters.maxPrice) params.max_price = filters.maxPrice;
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

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const getAmenityIcons = (amenities) => {
        if (!amenities || !Array.isArray(amenities)) return [];
        return amenities.slice(0, 3);
    };

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Accommodations</p>
                <h1 className="text-5xl font-bold text-white mb-4">Our Rooms</h1>
                <p className="text-white/70 text-xl max-w-xl mx-auto">
                    Choose from our carefully curated selection of rooms and suites
                </p>
            </div>

            {/* Filter Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="bg-white/95 rounded-2xl p-5 shadow-lg flex flex-wrap gap-4 items-end">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold mr-2">
                        <SlidersHorizontal size={18} className="text-primary" />
                        <span>Filter</span>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-[140px]">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Min Guests</label>
                        <select
                            value={filters.minGuests}
                            onChange={e => handleFilterChange('minGuests', e.target.value)}
                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                        >
                            <option value="">Any</option>
                            {[1, 2, 3, 4].map(n => (
                                <option key={n} value={n}>{n}+</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-[160px]">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Max Price / Night</label>
                        <input
                            type="number"
                            placeholder="e.g. 500"
                            value={filters.maxPrice}
                            onChange={e => handleFilterChange('maxPrice', e.target.value)}
                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            min={0}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-[150px]">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Bed Type</label>
                        <select
                            value={filters.bedType}
                            onChange={e => handleFilterChange('bedType', e.target.value)}
                            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                        >
                            {BED_TYPES.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={() => setFilters({ minGuests: '', maxPrice: '', bedType: 'All' })}
                        className="ml-auto text-sm text-slate-400 hover:text-slate-700 font-medium transition-colors cursor-pointer"
                    >
                        Clear filters
                    </button>
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
                        <p className="text-white/40 mt-2">Try adjusting the filter criteria above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roomTypes.map(roomType => (
                            <div
                                key={roomType.uuid || roomType.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
                            >
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <img
                                        src={roomType.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'}
                                        alt={roomType.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {roomType.bed_type && (
                                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                            {roomType.bed_type} Bed
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{roomType.name}</h3>

                                    {roomType.description && (
                                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {roomType.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-4">
                                        {roomType.max_guests && (
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <Users size={14} className="text-primary" />
                                                <span>Up to {roomType.max_guests}</span>
                                            </div>
                                        )}
                                        {roomType.bed_type && (
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <BedDouble size={14} className="text-primary" />
                                                <span>{roomType.bed_type}</span>
                                            </div>
                                        )}
                                        {roomType.size_sqm && (
                                            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <Maximize2 size={14} className="text-primary" />
                                                <span>{roomType.size_sqm} m²</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Amenities preview */}
                                    {getAmenityIcons(roomType.amenities).length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {getAmenityIcons(roomType.amenities).map((amenity, idx) => (
                                                <span key={idx} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                                                    {AMENITY_ICONS[amenity?.icon?.toLowerCase()] || <Wifi size={12} />}
                                                    {amenity?.name || amenity}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-primary">${roomType.price_per_night}</span>
                                            <span className="text-slate-400 text-sm"> / night</span>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/rooms/${roomType.uuid || roomType.id}`)}
                                            className="px-5 py-2.5 bg-primary text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm cursor-pointer"
                                        >
                                            Book This Room
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
