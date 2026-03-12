import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/NotificationBell";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navItems = [
    {
        name: "Dashboard",
        href: route("admin.dashboard"),
        icon: LayoutDashboard,
        color: "text-blue-500",
    },
    {
        name: "Hotels",
        href: route("admin.hotels.index"),
        icon: Hotel,
        color: "text-emerald-500",
    },
    {
        name: "Room Types",
        href: route("admin.room-types.index"),
        icon: BedDouble,
        color: "text-indigo-500",
    },
    {
        name: "Rooms",
        href: route("admin.rooms.index"),
        icon: Bed,
        color: "text-violet-500",
    },
    {
        name: "Bookings",
        href: route("admin.bookings.index"),
        icon: CalendarCheck,
        color: "text-amber-500",
    },
    {
        name: "Payments",
        href: route("admin.payments.index"),
        icon: CreditCard,
        color: "text-rose-500",
    },
    {
        name: "Users",
        href: route("admin.users.index"),
        icon: Users,
        color: "text-cyan-500",
    },
];

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const NavContent = () => (
        <div className="flex flex-col h-full bg-zinc-950 text-zinc-400">
            <div className="p-6 flex items-center justify-between">
                <Link
                    href={route("admin.dashboard")}
                    className="flex items-center gap-2 group"
                >
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-110 transition-transform">
                        H
                    </div>
                    {!isCollapsed && (
                        <span className="text-xl font-bold tracking-tight text-white animate-in fade-in slide-in-from-left-2 duration-300">
                            Hotel<span className="text-primary">Admin</span>
                        </span>
                    )}
                </Link>
            </div>

            <ScrollArea className="flex-1 px-4">
                <div className="space-y-1 py-4">
                    {!isCollapsed && (
                        <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Main Menu
                        </p>
                    )}
                    {navItems.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "hover:bg-zinc-900 hover:text-white",
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                                        isActive ? "text-primary" : item.color,
                                    )}
                                />
                                {!isCollapsed && (
                                    <span className="animate-in fade-in slide-in-from-left-2 duration-300">
                                        {item.name}
                                    </span>
                                )}
                                {isActive && !isCollapsed && (
                                    <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8 space-y-1 py-4 border-t border-zinc-900">
                    {!isCollapsed && (
                        <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Support
                        </p>
                    )}
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all hover:bg-zinc-900 hover:text-white group">
                        <Settings className="h-5 w-5 text-zinc-500 group-hover:text-white" />
                        {!isCollapsed && <span>Settings</span>}
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all hover:bg-zinc-900 hover:text-white group">
                        <HelpCircle className="h-5 w-5 text-zinc-500 group-hover:text-white" />
                        {!isCollapsed && <span>Internal Help</span>}
                    </button>
                </div>
            </ScrollArea>

            <div className="p-4 border-t border-zinc-900">
                <div
                    className={cn(
                        "bg-zinc-900/50 rounded-2xl p-3 flex items-center gap-3 transition-all",
                        isCollapsed ? "justify-center px-2" : "",
                    )}
                >
                    <Avatar className="h-8 w-8 border border-zinc-800">
                        <AvatarImage src={auth.user.avatar} />
                        <AvatarFallback>
                            {auth.user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">
                                {auth.user.name}
                            </p>
                            <p className="text-[10px] text-zinc-500 truncate">
                                {auth.user.role}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-[#F8F9FC] dark:bg-zinc-950 font-sans">
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col transition-all duration-300 border-r border-zinc-200 dark:border-zinc-800 overflow-hidden",
                    isCollapsed ? "w-20" : "w-72",
                )}
            >
                <NavContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Navbar */}
                <header className="h-20 flex items-center justify-between px-6 sticky top-0 z-30 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden md:flex text-zinc-500"
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
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-72 p-0 bg-zinc-950"
                            >
                                <NavContent />
                            </SheetContent>
                        </Sheet>

                        <div className="hidden sm:flex items-center relative group">
                            <Search className="absolute left-3 h-4 w-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search everything..."
                                className="pl-10 w-64 bg-zinc-100 dark:bg-zinc-900 border-none rounded-full focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col text-right mr-2">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white underline decoration-primary/50 underline-offset-4">
                                Admin Portal
                            </span>
                            <span className="text-[10px] text-zinc-500">
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
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-bold leading-none">
                                            {auth.user.name}
                                        </p>
                                        <p className="text-xs leading-none text-zinc-500">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    asChild
                                    className="cursor-pointer"
                                >
                                    <Link href={route("profile.edit")}>
                                        <UserCircle className="mr-2 h-4 w-4" />
                                        <span>Profile Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-rose-500 focus:text-rose-500 cursor-pointer"
                                    asChild
                                >
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full text-left"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign Out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Page View */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden">
                    <div className="p-6 md:p-10 max-w-[1600px] mx-auto min-h-full">
                        {children}
                    </div>

                    {/* Subtle Footer */}
                    <footer className="p-6 text-center text-[10px] text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
                        &copy; 2026 Hotel Booking Pro. Managed by{" "}
                        <span className="text-primary font-bold">koeuk</span>
                    </footer>
                </main>
            </div>
            <Toaster position="top-right" closeButton richColors />
        </div>
    );
}
