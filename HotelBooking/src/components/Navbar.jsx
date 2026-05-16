import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Hotel, LogOut, ShoppingCart } from 'lucide-react';
import api from '../lib/api';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (!user) { setCartCount(0); return; }
        api.get('/wishlist')
            .then(res => setCartCount(res.data.data?.length || 0))
            .catch(() => {});
    }, [user]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
                            <Hotel size={24} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                            HotelStay
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {[{ to: "/", label: "Home" }, { to: "/rooms", label: "Rooms" }, { to: "/about", label: "About" }].map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end
                                className={({ isActive }) =>
                                    `font-medium transition-colors relative pb-1 ${isActive
                                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full'
                                        : 'text-slate-600 hover:text-primary'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3">
                                {/* Cart icon with count */}
                                <Link to="/dashboard" className="relative p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-xl transition-all">
                                    <ShoppingCart size={22} />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                            {cartCount > 9 ? '9+' : cartCount}
                                        </span>
                                    )}
                                </Link>

                                <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-slate-700">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                        {user.name[0]}
                                    </div>
                                    <span className="font-medium hidden sm:inline">{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-6 py-2.5 text-slate-700 font-semibold hover:text-primary transition-colors">
                                    Sign In
                                </Link>
                                <Link to="/register" className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-md shadow-primary/20">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
