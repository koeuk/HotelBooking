import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { BedDouble, SlidersHorizontal } from 'lucide-react';

const STATUS_COLORS = {
    available:   'bg-green-50 text-green-800',
    booked:      'bg-amber-100 text-amber-700',
    maintenance: 'bg-red-100 text-red-700',
    cleaning:    'bg-blue-100 text-blue-700',
};

const ALL_STATUSES = ['available', 'booked', 'maintenance', 'cleaning'];

export default function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ status: '', room_type_id: '' });
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        api.get('/room-types')
            .then(res => setRoomTypes(res.data.data || res.data || []))
            .catch(console.error);
    }, []);

    useEffect(() => {
        const params = {};
        if (filters.status) params.status = filters.status;
        if (filters.room_type_id) params.room_type_id = filters.room_type_id;

        setLoading(true);
        api.get('/rooms', { params })
            .then(res => setRooms(res.data.data || res.data || []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [filters]);

    const handleStatusChange = async (roomId, newStatus) => {
        setUpdatingId(roomId);
        try {
            await api.patch(`/rooms/${roomId}`, { status: newStatus });
            setRooms(prev => prev.map(r =>
                (r.uuid === roomId || r.id === roomId) ? { ...r, status: newStatus } : r
            ));
        } catch (err) {
            console.error(err);
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Rooms</h1>
                <p className="text-slate-500 mt-1">Manage individual rooms and their availability.</p>
            </header>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-wrap gap-4 items-end">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <SlidersHorizontal size={16} className="text-primary" />
                    Filter
                </div>

                <div className="flex flex-col gap-1 min-w-[160px]">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Room Type</label>
                    <select
                        value={filters.room_type_id}
                        onChange={e => setFilters(f => ({ ...f, room_type_id: e.target.value }))}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                        <option value="">All Types</option>
                        {roomTypes.map(rt => (
                            <option key={rt.uuid || rt.id} value={rt.uuid || rt.id}>{rt.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-1 min-w-[140px]">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Status</label>
                    <select
                        value={filters.status}
                        onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                        <option value="">All Statuses</option>
                        {ALL_STATUSES.map(s => (
                            <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => setFilters({ status: '', room_type_id: '' })}
                    className="ml-auto text-sm text-slate-400 hover:text-slate-700 font-medium transition-colors cursor-pointer"
                >
                    Clear
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-8 space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : rooms.length === 0 ? (
                    <div className="text-center py-20">
                        <BedDouble size={40} className="mx-auto text-slate-300 mb-3" />
                        <p className="text-slate-500 font-medium">No rooms found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr className="text-slate-500 font-semibold text-xs uppercase tracking-wide">
                                    <th className="text-left px-5 py-4">Room Number</th>
                                    <th className="text-left px-5 py-4">Floor</th>
                                    <th className="text-left px-5 py-4">Type</th>
                                    <th className="text-left px-5 py-4">Status</th>
                                    <th className="text-left px-5 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms.map(room => {
                                    const roomId = room.uuid || room.id;
                                    return (
                                        <tr key={roomId} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-4 font-bold text-slate-800">
                                                #{room.room_number}
                                            </td>
                                            <td className="px-5 py-4 text-slate-600">
                                                {room.floor ? `Floor ${room.floor}` : '—'}
                                            </td>
                                            <td className="px-5 py-4 text-slate-600">
                                                {room.room_type?.name || '—'}
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[room.status] || STATUS_COLORS.available}`}>
                                                    {room.status || 'available'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <select
                                                    value={room.status || 'available'}
                                                    disabled={updatingId === roomId}
                                                    onChange={e => handleStatusChange(roomId, e.target.value)}
                                                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 cursor-pointer"
                                                >
                                                    {ALL_STATUSES.map(s => (
                                                        <option key={s} value={s} className="capitalize">
                                                            {s.charAt(0).toUpperCase() + s.slice(1)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
