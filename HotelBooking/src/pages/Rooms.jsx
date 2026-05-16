import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
    BedDouble, Users, Maximize2, Layers, ChevronRight,
    Hash, ChevronDown, Check, Heart, ShoppingCart, X,
} from 'lucide-react';

const STATUS_STYLES = {
    available:   'bg-green-50 text-green-700 border-green-200',
    booked:      'bg-amber-50 text-amber-700 border-amber-200',
    maintenance: 'bg-red-50 text-red-600 border-red-200',
    cleaning:    'bg-blue-50 text-blue-600 border-blue-200',
};

const STATUS_OPTIONS = [
    { value: 'all',         label: 'All Statuses',  dot: 'bg-border' },
    { value: 'available',   label: 'Available',     dot: 'bg-green-500' },
    { value: 'booked',      label: 'Booked',        dot: 'bg-amber-500' },
    { value: 'maintenance', label: 'Maintenance',   dot: 'bg-red-500' },
    { value: 'cleaning',    label: 'Cleaning',      dot: 'bg-blue-500' },
];

const ROOM_TYPES = ['All', 'Standard Room', 'Deluxe Room', 'Suite'];

function StatusDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selected = STATUS_OPTIONS.find(o => o.value === value) || STATUS_OPTIONS[0];

    useEffect(() => {
        const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(v => !v)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors cursor-pointer group"
            >
                <div className="text-left">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</p>
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground mt-0.5">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${selected.dot}`} />
                        {selected.label}
                    </p>
                </div>
                <ChevronDown
                    size={14}
                    className={`text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-2xl shadow-warm-lg z-50 overflow-hidden py-1.5">
                    {STATUS_OPTIONS.map(option => {
                        const isActive = value === option.value;
                        return (
                            <button
                                key={option.value}
                                onClick={() => { onChange(option.value); setOpen(false); }}
                                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                                    isActive ? 'bg-muted' : 'hover:bg-muted/60'
                                }`}
                            >
                                <span className={`w-2 h-2 rounded-full shrink-0 ${option.dot}`} />
                                <span className={isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                                    {option.label}
                                </span>
                                {isActive && <Check size={13} className="text-green-800 ml-auto shrink-0" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function Toast({ message, type, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 2500);
        return () => clearTimeout(t);
    }, [onClose]);

    const colors = type === 'error'
        ? 'bg-red-50 border-red-200 text-red-700'
        : type === 'cart'
        ? 'bg-blue-50 border-blue-200 text-blue-700'
        : 'bg-green-50 border-green-200 text-green-800';

    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-warm text-sm font-semibold ${colors}`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-auto cursor-pointer opacity-60 hover:opacity-100">
                <X size={14} />
            </button>
        </div>
    );
}

export default function Rooms() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartIds, toggleCart } = useCart();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ type: 'All', status: 'available' });
    const [favoriteIds, setFavoriteIds] = useState(new Set());
    const [toasts, setToasts] = useState([]);
    const [loadingActions, setLoadingActions] = useState({});

    useEffect(() => {
        setLoading(true);
        api.get('/rooms', { params: { per_page: 50 } })
            .then(res => {
                const data = res.data.data || res.data || [];
                setRooms(Array.isArray(data) ? data : []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!user) { setFavoriteIds(new Set()); return; }
        api.get('/favorites')
            .then(res => setFavoriteIds(new Set(res.data.data || [])))
            .catch(() => {});
    }, [user]);

    const pushToast = useCallback((message, type = 'save') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const handleSave = async (roomTypeId) => {
        if (!user) { navigate('/login'); return; }
        const key = `save-${roomTypeId}`;
        if (loadingActions[key]) return;
        setLoadingActions(prev => ({ ...prev, [key]: true }));
        try {
            const isSaved = favoriteIds.has(roomTypeId);
            if (isSaved) {
                await api.delete(`/favorites/${roomTypeId}`);
                setFavoriteIds(prev => { const s = new Set(prev); s.delete(roomTypeId); return s; });
                pushToast('Removed from saved', 'save');
            } else {
                await api.post(`/favorites/${roomTypeId}`);
                setFavoriteIds(prev => new Set([...prev, roomTypeId]));
                pushToast('Room saved!', 'save');
            }
        } catch {
            pushToast('Something went wrong', 'error');
        } finally {
            setLoadingActions(prev => ({ ...prev, [key]: false }));
        }
    };

    const handleCart = async (roomTypeId) => {
        if (!user) { navigate('/login'); return; }
        const key = `cart-${roomTypeId}`;
        if (loadingActions[key]) return;
        setLoadingActions(prev => ({ ...prev, [key]: true }));
        try {
            const inCart = cartIds.has(roomTypeId);
            await toggleCart(roomTypeId);
            pushToast(inCart ? 'Removed from cart' : 'Added to cart!', 'cart');
        } catch {
            pushToast('Something went wrong', 'error');
        } finally {
            setLoadingActions(prev => ({ ...prev, [key]: false }));
        }
    };

    const filtered = rooms.filter(room => {
        if (filters.type !== 'All' && room.room_type?.name !== filters.type) return false;
        if (filters.status !== 'all' && room.status !== filters.status) return false;
        return true;
    });

    return (
        <div className="min-h-screen">
            {/* Toast stack */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id} className="pointer-events-auto">
                        <Toast message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="py-16 px-4 text-center">
                <p className="text-green-800 text-xs font-bold uppercase tracking-[0.2em] mb-3">Accommodations</p>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">Our Rooms</h1>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                    {rooms.length} rooms across {ROOM_TYPES.length - 1} categories
                </p>
            </div>

            {/* Filter Bar */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-card border border-border rounded-2xl shadow-warm p-2 flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-1 p-1 bg-muted rounded-xl flex-wrap">
                        {ROOM_TYPES.map(t => (
                            <button
                                key={t}
                                onClick={() => setFilters(f => ({ ...f, type: t }))}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                                    filters.type === t
                                        ? 'bg-card text-green-800 shadow-warm-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-border mx-1 hidden sm:block" />

                    <StatusDropdown
                        value={filters.status}
                        onChange={val => setFilters(f => ({ ...f, status: val }))}
                    />

                    <div className="ml-auto mr-2 text-xs text-muted-foreground font-semibold whitespace-nowrap">
                        {filtered.length} room{filtered.length !== 1 ? 's' : ''}
                    </div>
                </div>
            </div>

            {/* Room Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-72 bg-muted rounded-3xl animate-pulse border border-border" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24 bg-card rounded-3xl border border-border shadow-warm-sm">
                        <BedDouble size={48} className="mx-auto text-muted-foreground/40 mb-4" />
                        <p className="text-foreground text-xl font-semibold">No rooms match your filters.</p>
                        <button
                            onClick={() => setFilters({ type: 'All', status: 'all' })}
                            className="mt-4 underline text-sm cursor-pointer hover:opacity-80 transition-opacity text-green-800"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map(room => {
                            const rt = room.room_type || {};
                            const rtId = rt.id;
                            const isAvailable = room.status === 'available';
                            const isSaved = favoriteIds.has(rtId);
                            const inCart = cartIds.has(rtId);
                            return (
                                <div
                                    key={room.uuid || room.id}
                                    className="bg-card rounded-3xl overflow-hidden shadow-warm hover:-translate-y-1 hover:shadow-warm-lg transition-all duration-300 group flex flex-col border border-border"
                                >
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={rt.images?.[0] || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600'}
                                            alt={rt.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                                        {/* Save button */}
                                        <button
                                            onClick={() => handleSave(rtId)}
                                            title={isSaved ? 'Remove from saved' : 'Save room'}
                                            className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                                                isSaved
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-white/80 text-muted-foreground hover:bg-white hover:text-red-500'
                                            }`}
                                        >
                                            <Heart size={14} className={isSaved ? 'fill-white' : ''} />
                                        </button>

                                        <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full capitalize border ${STATUS_STYLES[room.status] || STATUS_STYLES.available}`}>
                                            {room.status}
                                        </span>

                                        <div className="absolute bottom-3 left-3 text-white text-sm font-bold">
                                            ${rt.price_per_night}<span className="font-normal opacity-75 text-xs">/night</span>
                                        </div>
                                    </div>

                                    <div className="p-4 flex flex-col flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="text-green-800 text-xs font-bold uppercase tracking-wide">{rt.name}</p>
                                                <h3 className="text-base font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                                                    <Hash size={13} className="text-muted-foreground" />
                                                    Room {room.room_number}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                <Layers size={11} className="text-green-800" />
                                                Floor {room.floor}
                                            </span>
                                            {rt.max_guests && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                    <Users size={11} className="text-green-800" />
                                                    {rt.max_guests} guests
                                                </span>
                                            )}
                                            {rt.bed_type && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                    <BedDouble size={11} className="text-green-800" />
                                                    {rt.bed_type}
                                                </span>
                                            )}
                                            {rt.size_sqm && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                    <Maximize2 size={11} className="text-green-800" />
                                                    {rt.size_sqm} m²
                                                </span>
                                            )}
                                        </div>

                                        {/* Action row */}
                                        <div className="mt-auto flex gap-2">
                                            {/* Add to cart */}
                                            <button
                                                onClick={() => handleCart(rtId)}
                                                title={inCart ? 'Remove from cart' : 'Add to cart'}
                                                className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl text-xs font-bold border transition-all duration-200 cursor-pointer shrink-0 ${
                                                    inCart
                                                        ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                                        : 'bg-muted text-muted-foreground border-border hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200'
                                                }`}
                                            >
                                                <ShoppingCart size={13} className={inCart ? 'fill-blue-200' : ''} />
                                                {inCart ? 'In Cart' : 'Cart'}
                                            </button>

                                            {/* Book Now */}
                                            <button
                                                onClick={() => isAvailable && navigate(`/book/${room.uuid}`)}
                                                disabled={!isAvailable}
                                                className={`flex-1 flex items-center justify-center gap-2 py-2.5 font-bold rounded-2xl transition-colors duration-200 text-sm cursor-pointer ${
                                                    isAvailable
                                                        ? 'text-white'
                                                        : 'bg-muted text-muted-foreground cursor-not-allowed'
                                                }`}
                                                style={isAvailable ? { backgroundColor: 'var(--color-primary)' } : {}}
                                                onMouseEnter={e => { if (isAvailable) e.currentTarget.style.backgroundColor = 'var(--color-primary-light)'; }}
                                                onMouseLeave={e => { if (isAvailable) e.currentTarget.style.backgroundColor = 'var(--color-primary)'; }}
                                            >
                                                {isAvailable ? (
                                                    <>Book Now <ChevronRight size={15} /></>
                                                ) : (
                                                    <span className="capitalize">{room.status}</span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
