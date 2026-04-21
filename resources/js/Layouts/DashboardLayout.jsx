import { useState, useEffect, useRef } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    LayoutDashboard,
    Hotel,
    BedDouble,
    Bed,
    CalendarCheck,
    CreditCard,
    Users,
    Bell,
    Menu,
    X,
    LogOut,
    UserCircle,
    Search,
    ChevronLeft,
    Settings,
    HelpCircle,
    Sparkles,
    Star,
    Tag,
    BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/NotificationBell";
import ThemeToggle from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import BackToTop from "@/components/BackToTop";

const navItems = [
    {
        name: "Dashboard",
        routeName: "dashboard.index",
        icon: LayoutDashboard,
        color: "text-blue-500",
    },
    {
        name: "Hotels",
        routeName: "dashboard.hotels.index",
        icon: Hotel,
        color: "text-emerald-500",
    },
    {
        name: "Room Types",
        routeName: "dashboard.room-types.index",
        icon: BedDouble,
        color: "text-indigo-500",
    },
    {
        name: "Rooms",
        routeName: "dashboard.rooms.index",
        icon: Bed,
        color: "text-violet-500",
    },
    {
        name: "Bookings",
        routeName: "dashboard.bookings.index",
        icon: CalendarCheck,
        color: "text-amber-500",
    },
    {
        name: "Payments",
        routeName: "dashboard.payments.index",
        icon: CreditCard,
        color: "text-rose-500",
    },
    {
        name: "Users",
        routeName: "dashboard.users.index",
        icon: Users,
        color: "text-cyan-500",
    },
    {
        name: "Amenities",
        routeName: "dashboard.amenities.index",
        icon: Sparkles,
        color: "text-teal-500",
    },
    {
        name: "Reviews",
        routeName: "dashboard.reviews.index",
        icon: Star,
        color: "text-yellow-500",
    },
    {
        name: "Coupons",
        routeName: "dashboard.coupons.index",
        icon: Tag,
        color: "text-pink-500",
    },
    {
        name: "Reports",
        routeName: "dashboard.reports.index",
        icon: BarChart3,
        color: "text-orange-500",
    },
    {
        name: "Notifications",
        routeName: "dashboard.notifications.index",
        icon: Bell,
        color: "text-rose-500",
    },
];

export default function DashboardLayout({ children }) {
    const { auth, flash } = usePage().props;
    const { url } = usePage();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const mainRef = useRef(null);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const NavContent = () => (
        <div className="flex flex-col h-full relative text-zinc-200 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900 dark:bg-zinc-950" />
            <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
            <div className="relative flex flex-col h-full">
            <div className="p-6 flex items-center justify-between">
                <Link
                    href={route("dashboard.index")}
                    className="flex items-center gap-2 group"
                >
                    <div className="h-9 w-9 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-glow group-hover:scale-110 transition-transform">
                        H
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold tracking-tight text-white animate-in fade-in slide-in-from-left-2 duration-300">
                            Hotel
                            <span className="text-gradient-primary">
                                Dashboard
                            </span>
                        </span>
                    )}
                </Link>
            </div>

            <ScrollArea className="flex-1 px-4">
                <div className="space-y-1 py-4">
                    {!isCollapsed && (
                        <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                            Main Menu
                        </p>
                    )}
                    {navItems.map((item) => {
                        const itemUrl = route(item.routeName);
                        const itemPath = new URL(itemUrl).pathname;
                        const isActive = url === itemPath || (itemPath !== '/dashboard' && url.startsWith(itemPath));
                        return (
                            <Link
                                key={item.name}
                                href={itemUrl}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-2xl transition-all duration-300 ease-out-expo group relative",
                                    isActive
                                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                                        : "hover:bg-white/5 hover:text-white",
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                                        isActive
                                            ? "text-primary-foreground"
                                            : item.color,
                                    )}
                                />
                                {!isCollapsed && (
                                    <span className="animate-in fade-in slide-in-from-left-2 duration-300">
                                        {item.name}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 space-y-1 py-4 border-t border-slate-700/50">
                    {!isCollapsed && (
                        <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                            Support
                        </p>
                    )}
                    {(() => {
                        const settingsPath = new URL(route("dashboard.settings.index")).pathname;
                        const isSettingsActive = url.startsWith(settingsPath);
                        return (
                            <>
                                <Link
                                    href={route("dashboard.settings.index")}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-2xl transition-all duration-300 ease-out-expo group relative",
                                        isSettingsActive
                                            ? "bg-gradient-primary text-primary-foreground shadow-glow"
                                            : "hover:bg-white/5 hover:text-white",
                                    )}
                                >
                                    <Settings className={cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110", isSettingsActive ? "text-primary-foreground" : "text-zinc-300")} />
                                    {!isCollapsed && (
                                        <span className="animate-in fade-in slide-in-from-left-2 duration-300">Settings</span>
                                    )}
                                </Link>
                                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-2xl transition-all hover:bg-white/5 hover:text-white group">
                                    <HelpCircle className="h-5 w-5 text-zinc-300 group-hover:text-white" />
                                    {!isCollapsed && <span>Internal Help</span>}
                                </button>
                            </>
                        );
                    })()}
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-white/5">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className={cn(
                                "w-full glass rounded-2xl p-3 flex items-center gap-3 transition-all hover:bg-white/10 cursor-pointer",
                                isCollapsed ? "justify-center px-2" : "",
                            )}
                        >
                            <Avatar className="h-8 w-8 border border-slate-700/30">
                                <AvatarImage src={auth.user.avatar} />
                                <AvatarFallback>
                                    {auth.user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            {!isCollapsed && (
                                <>
                                    <div className="flex-1 overflow-hidden text-left">
                                        <p className="text-xs font-bold text-white truncate">
                                            {auth.user.name}
                                        </p>
                                        <p className="text-[10px] text-zinc-300 truncate">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                    <ChevronLeft className="h-4 w-4 text-zinc-300 rotate-90" />
                                </>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="top"
                        align="start"
                        className="w-56 mb-2"
                    >
                        <DropdownMenuGroup><DropdownMenuLabel className="font-normal">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={auth.user.avatar} />
                                    <AvatarFallback>{auth.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-bold truncate">{auth.user.name}</p>
                                    <p className="text-xs text-muted-foreground truncate">{auth.user.email}</p>
                                </div>
                            </div>
                        </DropdownMenuLabel></DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.get(route("dashboard.settings.index"))}>
                            <Settings className="h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer text-rose-500 focus:text-rose-500"
                            onClick={() => router.post(route("dashboard.logout"))}
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900 font-sans">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col transition-all duration-300 border-r border-zinc-200 dark:border-slate-700/30 overflow-hidden",
                    isCollapsed ? "w-20" : "w-72",
                )}
            >
                <NavContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Navbar */}
                <header className="h-20 flex items-center justify-between px-6 sticky top-0 z-30 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-zinc-200 dark:border-slate-700/30">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden md:flex text-zinc-300"
                            aria-label={
                                isCollapsed
                                    ? "Expand sidebar"
                                    : "Collapse sidebar"
                            }
                        >
                            <Menu className="h-5 w-5" />
                        </Button>

                        <Sheet
                            open={isMobileOpen}
                            onOpenChange={setIsMobileOpen}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                    aria-label="Open navigation"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-72 p-0 bg-slate-800 dark:bg-zinc-900"
                            >
                                <NavContent />
                            </SheetContent>
                        </Sheet>

                        <div className="hidden sm:flex items-center relative group">
                            <Search className="absolute left-4 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                            <Input
                                variant="soft"
                                placeholder="Search everything…"
                                className="pl-11 w-64"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col text-right mr-2">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white underline decoration-primary/50 underline-offset-4">
                                Management Dashboard
                            </span>
                            <span className="text-[10px] text-zinc-300">
                                {new Date().toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                        <Separator
                            orientation="vertical"
                            className="h-6 mx-2 hidden sm:block"
                        />

                        <ThemeToggle />

                        <NotificationBell />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all"
                                >
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src={auth.user.avatar} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {auth.user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 mt-2"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuGroup><DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none">
                                            {auth.user.name}
                                        </p>
                                        <p className="text-xs leading-none text-zinc-300">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel></DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={() => router.get(route("dashboard.settings.index"))}>
                                    <UserCircle className="h-4 w-4" />
                                    Profile Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-rose-500 focus:text-rose-500 cursor-pointer"
                                    onClick={() => router.post(route("dashboard.logout"))}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Page View */}
                <main
                    ref={mainRef}
                    className="flex-1 overflow-y-auto overflow-x-hidden"
                >
                    <div className="p-6 md:p-10 min-h-full">
                        {children}
                    </div>

                    {/* Subtle Footer */}
                    <footer className="p-6 text-center text-[10px] text-zinc-400 border-t border-zinc-200 dark:border-slate-700/30">
                        &copy; 2026 Hotel Booking Pro. Managed by{" "}
                        <span className="text-primary font-bold">koeuk</span>
                    </footer>
                </main>
            </div>
            <Toaster position="top-right" closeButton richColors />
            <BackToTop scrollContainer={mainRef} />
        </div>
    );
}
