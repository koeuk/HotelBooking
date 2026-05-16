import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    LayoutDashboard, 
    Hotel, 
    BedDouble, 
    CalendarCheck, 
    Users, 
    CreditCard, 
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    if (!user || user.role !== 'admin') {
        // Redirect if not admin (in a real app, you'd show an unauthorized page or redirect to login)
        // navigate('/login');
        // return null;
    }

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Overview',      path: '/admin/dashboard' },
        { icon: <BedDouble size={20} />,       label: 'Rooms',         path: '/admin/rooms' },
        { icon: <Hotel size={20} />,           label: 'Room Types',    path: '/admin/room-types' },
        { icon: <CalendarCheck size={20} />,   label: 'Bookings',      path: '/admin/bookings' },
        { icon: <CreditCard size={20} />,      label: 'Payments',      path: '/admin/payments' },
        { icon: <Users size={20} />,           label: 'Users',         path: '/admin/users' },
        { icon: <Settings size={20} />,        label: 'Hotel Settings',path: '/admin/hotel-settings' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-slate-900 transition-all duration-300 flex flex-col fixed h-full z-50`}>
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && (
                        <div className="flex items-center gap-2">
                            <div className="bg-primary p-2 rounded-xl text-white">
                                <Hotel size={20} />
                            </div>
                            <span className="text-white font-bold text-xl">AdminPanel</span>
                        </div>
                    )}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="mt-8 flex-1 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link 
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                                location.pathname === item.path 
                                ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }`}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button 
                        onClick={() => { logout(); navigate('/login'); }}
                        className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-2xl transition-all"
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-2xl w-96 border border-slate-200">
                        <Search size={18} className="text-slate-400" />
                        <input type="text" placeholder="Search data..." className="bg-transparent outline-none text-sm w-full" />
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200" />
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-900">{user?.name || 'Admin User'}</p>
                                <p className="text-xs text-slate-500">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=random`} alt="Admin" />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
