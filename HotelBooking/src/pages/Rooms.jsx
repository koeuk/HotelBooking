import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { BedDouble, Users, Maximize2, Layers, ChevronRight, Hash, ChevronDown, Check } from 'lucide-react';

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
                                {isActive && (
                                    <Check size={13} className="ml-auto shrink-0" style={{ color: 'var(--color-primary)' }} />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function Rooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ type: 'All', status: 'available' });

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

    const filtered = rooms.filter(room => {
        if (filters.type !== 'All' && room.room_type?.name !== filters.type) return false;
        if (filters.status !== 'all' && room.status !== filters.status) return false;
        return true;
    });

    return (
        <div className="min-h-screen">
            {/* Header */}
            <div className="py-16 px-4 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-primary)' }}>Accommodations</p>
                <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">Our Rooms</h1>
                <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                    {rooms.length} rooms across {ROOM_TYPES.length - 1} categories
                </p>
            </div>

            {/* Filter Bar */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="bg-card border border-border rounded-2xl shadow-warm p-2 flex flex-wrap gap-2 items-center">
                    {/* Room type pills */}
                    <div className="flex items-center gap-1 p-1 bg-muted rounded-xl flex-wrap">
                        {ROOM_TYPES.map(t => (
                            <button
                                key={t}
                                onClick={() => setFilters(f => ({ ...f, type: t }))}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                                    filters.type === t
                                        ? 'bg-card shadow-warm-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                                style={filters.type === t ? { color: 'var(--color-primary)' } : {}}
                            >
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-border mx-1 hidden sm:block" />

                    {/* Custom status dropdown */}
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
                            className="mt-4 underline text-sm cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ color: 'var(--color-primary)' }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map(room => {
                            const rt = room.room_type || {};
                            const isAvailable = room.status === 'available';
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
                                                <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--color-primary)' }}>{rt.name}</p>
                                                <h3 className="text-base font-bold text-foreground flex items-center gap-1.5 mt-0.5">
                                                    <Hash size={13} className="text-muted-foreground" />
                                                    Room {room.room_number}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                <Layers size={11} style={{ color: 'var(--color-primary)' }} />
                                                Floor {room.floor}
                                            </span>
                                            {rt.max_guests && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                    <Users size={11} style={{ color: 'var(--color-primary)' }} />
                                                    {rt.max_guests} guests
                                                </span>
                                            )}
                                            {rt.bed_type && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                    <BedDouble size={11} style={{ color: 'var(--color-primary)' }} />
                                                    {rt.bed_type}
                                                </span>
                                            )}
                                            {rt.size_sqm && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                                                    <Maximize2 size={11} style={{ color: 'var(--color-primary)' }} />
                                                    {rt.size_sqm} m²
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => isAvailable && navigate(`/book/${room.uuid}`)}
                                            disabled={!isAvailable}
                                            className={`mt-auto w-full flex items-center justify-center gap-2 py-2.5 font-bold rounded-2xl transition-colors duration-200 text-sm cursor-pointer ${
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
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
