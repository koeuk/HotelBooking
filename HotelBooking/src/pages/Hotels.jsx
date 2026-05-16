import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { MapPin, Star, Search } from 'lucide-react';

export default function Hotels() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('/hotels')
            .then(res => setHotels(res.data.data || []))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const filtered = hotels.filter(h =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.city?.toLowerCase().includes(search.toLowerCase()) ||
        h.country?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">All Hotels</h1>
                    <p className="text-slate-500 text-lg">Browse and book from our curated selection of hotels.</p>
                </div>

                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, city or country..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
                    />
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-80 bg-slate-200 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">No hotels found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map(hotel => (
                            <Link
                                key={hotel.id}
                                to={`/hotels/${hotel.uuid || hotel.id}`}
                                className="group block bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow"
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-lg font-bold text-slate-900 truncate flex-1">{hotel.name}</h3>
                                        {hotel.rating && (
                                            <div className="flex items-center gap-1 ml-2 shrink-0">
                                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                                <span className="text-sm font-semibold text-slate-700">{Number(hotel.rating).toFixed(1)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center text-slate-500 text-sm">
                                        <MapPin size={14} className="mr-1 shrink-0" />
                                        <span>{hotel.city}, {hotel.country}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
