import React from 'react';
import { 
    Users, 
    Hotel, 
    CalendarCheck, 
    TrendingUp, 
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Revenue', value: '$24,500', trend: '+12.5%', isUp: true, icon: <DollarSign size={24} />, color: 'bg-green-500' },
        { label: 'Active Bookings', value: '142', trend: '+5.2%', isUp: true, icon: <CalendarCheck size={24} />, color: 'bg-blue-500' },
        { label: 'Total Hotels', value: '12', trend: '0%', isUp: true, icon: <Hotel size={24} />, color: 'bg-purple-500' },
        { label: 'Total Users', value: '1,240', trend: '+8.1%', isUp: true, icon: <Users size={24} />, color: 'bg-amber-500' },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 mt-2">Welcome back, here's what's happening with your business today.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} text-white p-3 rounded-2xl`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-bold ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.trend}
                                {stat.isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            </div>
                        </div>
                        <p className="text-slate-500 font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Charts & Recent Activity Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-96 flex items-center justify-center text-slate-400">
                    Revenue Chart Placeholder
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm h-96">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Bookings</h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200" />
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">Guest Name {i}</p>
                                        <p className="text-xs text-slate-500">Deluxe Room • 2 nights</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full">
                                    Confirmed
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
