import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import {
    Star,
    MapPin,
    BedDouble,
    ArrowRight,
    Search,
    Shield,
    Clock,
    Sparkles,
    Heart,
    ShoppingCart,
} from "lucide-react";

export default function Home() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState({});
    const [cart, setCart] = useState({});

    const toggleFavorite = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleCart = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setCart(prev => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        api.get('/hotels')
            .then(res => {
                setHotels(res.data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const goSearch = () => {
        // Implementation for search redirect
    };

    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
                <div className="absolute inset-0 noise opacity-[0.03]" />
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
                    <Badge variant="glass" className="mx-auto px-4 py-1.5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                        <span className="ml-2">Hand-picked stays for 2026</span>
                    </Badge>

                    <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Find your <span className="text-gradient-primary">perfect stay</span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Discover boutique hotels, beachside resorts, and urban escapes — booked in seconds.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-[2rem] shadow-2xl shadow-primary/10 border border-slate-100 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="flex-1 relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <Input 
                                variant="soft" 
                                placeholder="Search hotels, cities, countries..." 
                                className="pl-14 border-none bg-transparent h-14 text-lg"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="gradient" size="xl" shape="pill" className="px-10 text-lg font-bold">
                            Search
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-slate-400 font-medium">
                        <div className="flex items-center gap-2">
                            <Shield className="text-emerald-500" size={20} />
                            <span>Best Price Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="text-sky-500" size={20} />
                            <span>Free Cancellation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="text-amber-500" size={20} />
                            <span>5+ Reviews</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Rated Stays */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900">Top rated stays</h2>
                        <p className="text-slate-500 mt-2 text-lg">Discover our highest-rated properties</p>
                    </div>
                    <Link to="/hotels" className="group flex items-center gap-2 text-primary font-bold text-lg hover:gap-3 transition-all">
                        View all <ArrowRight size={20} />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[400px] bg-slate-100 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hotels.map(hotel => (
                            <Link key={hotel.id} to={`/hotels/${hotel.uuid}`}>
                                <Card variant="elevated" interactive className="h-full border-none shadow-soft">
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <img
                                            src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <button
                                            onClick={(e) => toggleFavorite(e, hotel.id)}
                                            className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-md hover:scale-110 transition-transform"
                                        >
                                            <Heart
                                                size={17}
                                                className={favorites[hotel.id] ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}
                                            />
                                        </button>
                                        {hotel.reviews_avg_rating && (
                                            <Badge variant="glass" className="absolute top-4 right-4 bg-white/90 backdrop-blur-md">
                                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                                <span className="ml-1 font-bold">{Number(hotel.reviews_avg_rating).toFixed(1)}</span>
                                            </Badge>
                                        )}
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-slate-900 truncate">{hotel.name}</h3>
                                        </div>
                                        <div className="flex items-center text-slate-500 mb-4">
                                            <MapPin size={16} className="mr-1" />
                                            <span className="text-sm">{hotel.city}, {hotel.country}</span>
                                        </div>
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                            <div className="text-slate-400 text-xs font-medium">
                                                {hotel.rooms_count || 0} rooms available
                                                <span className="mx-2">·</span>
                                                {hotel.reviews_count || 0} reviews
                                            </div>
                                            <button
                                                onClick={(e) => toggleCart(e, hotel.id)}
                                                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                                                    cart[hotel.id]
                                                        ? 'bg-primary text-white'
                                                        : 'bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary'
                                                }`}
                                            >
                                                <ShoppingCart size={13} />
                                                {cart[hotel.id] ? 'Added' : 'Add'}
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
