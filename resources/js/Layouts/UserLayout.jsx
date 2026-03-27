import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Heart,
    CalendarCheck,
    Star,
    Bell,
    User,
    Settings,
    ChevronRight,
    Search,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import WebLayout from "./WebLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";

const sidebarLinks = [
    {
        name: "Dashboard",
        href: "/web",
        icon: LayoutDashboard,
        color: "text-blue-500",
    },
    {
        name: "My Bookings",
        href: "/web/my-bookings",
        icon: CalendarCheck,
        color: "text-emerald-500",
    },
    {
        name: "Favorites",
        href: "/web/favorites",
        icon: Heart,
        color: "text-rose-500",
    },
    {
        name: "My Reviews",
        href: "/web/my-reviews",
        icon: Star,
        color: "text-amber-500",
    },
    {
        name: "Notifications",
        href: "/web/notifications",
        icon: Bell,
        color: "text-indigo-500",
    },
];

export default function UserLayout({ children, title }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = auth.user;

    const isActive = (href) => {
        if (href === "/web") return url === "/web";
        return url.startsWith(href);
    };

    return (
        <WebLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Sidebar - Desktop */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* User Profile Summary */}
                            <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                                <div className="flex flex-col items-center text-center">
                                    <Avatar className="h-16 w-16 border-2 border-primary/20 p-0.5">
                                        <AvatarImage src={user.avatar} />
                                        <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold font-serif">
                                            {user.name?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="mt-4">
                                        <h2 className="font-bold text-lg text-foreground truncate max-w-[200px]">{user.name}</h2>
                                        <p className="text-sm text-muted-foreground truncate max-w-[200px]">{user.email}</p>
                                    </div>
                                    <Badge variant="secondary" className="mt-3 capitalize px-3 py-0.5">
                                        {user.role} Member
                                    </Badge>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                                <div className="p-3">
                                    <p className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dashboard Menu</p>
                                    <div className="space-y-1">
                                        {sidebarLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className={cn(
                                                    "flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-200",
                                                    isActive(link.href)
                                                        ? "bg-primary/10 text-primary shadow-sm"
                                                        : "text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-foreground"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <link.icon className={cn(
                                                        "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                                                        isActive(link.href) ? "text-primary" : link.color
                                                    )} />
                                                    <span className="font-medium">{link.name}</span>
                                                </div>
                                                {isActive(link.href) && <ChevronRight className="h-4 w-4" />}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-zinc-100 dark:border-zinc-800 p-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <Link
                                        href="/web/profile"
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-white dark:hover:bg-zinc-800 hover:text-foreground",
                                            url === "/profile" ? "text-primary bg-primary/10" : ""
                                        )}
                                    >
                                        <Settings className="h-5 w-5" />
                                        <span className="font-medium">Profile Settings</span>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 min-w-0">
                        {/* Mobile Sidebar Toggle - Visible on mobile only */}
                        <div className="lg:hidden flex items-center justify-between bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-6 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                        {user.name?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-sm leading-none">{user.name}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role} Account</p>
                                </div>
                            </div>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="rounded-lg h-9 gap-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                                {sidebarLinks.find(l => isActive(l.href))?.name || "Menu"}
                            </Button>
                        </div>

                        {/* Mobile Navigation Dropdown */}
                        {isMobileMenuOpen && (
                            <div className="lg:hidden animate-in fade-in slide-in-from-top-2 duration-300 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden mb-6 shadow-lg">
                                <div className="p-2 space-y-1">
                                    {sidebarLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                                                isActive(link.href)
                                                    ? "bg-primary/10 text-primary"
                                                    : "text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                            )}
                                        >
                                            <link.icon className={cn("h-4 w-4", isActive(link.href) ? "text-primary" : link.color)} />
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Separator className="my-1 mx-2" />
                                    <Link
                                        href="/web/profile"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900"
                                    >
                                        <Settings className="h-4 w-4" />
                                        Profile Settings
                                    </Link>
                                </div>
                            </div>
                        )}

                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </WebLayout>
    );
}

// Internal Badge and Separator components if needed, or import from ui
function Badge({ variant = "default", className, ...props }) {
    const variants = {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border text-foreground",
    };
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}

function Separator({ className }) {
    return <div className={cn("h-px bg-zinc-200 dark:bg-zinc-800", className)} />;
}
