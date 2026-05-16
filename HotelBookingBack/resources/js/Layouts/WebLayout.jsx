import { Link, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hotel, Menu, X, User, LogOut, Settings, CalendarCheck, Star, Bell, Heart, LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import BackToTop from "@/components/BackToTop";

const publicLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const userLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "My Bookings", href: "/web/my-bookings" },
    { name: "Contact", href: "/contact" },
];

export default function WebLayout({ children }) {
    const { auth, flash } = usePage().props;
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = auth?.user;
    const navLinks = user ? userLinks : publicLinks;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 font-sans">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-110 transition-transform">
                                H
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Hotel<span className="text-primary">Book</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                        url === link.href
                                            ? "text-primary bg-primary/5"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent",
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            {user ? (
                                <div className="hidden md:flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                                                        {user.name?.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuGroup>
                                                <DropdownMenuLabel className="font-normal">
                                                    <div className="flex flex-col space-y-1">
                                                        <p className="text-sm font-bold">{user.name}</p>
                                                        <p className="text-xs text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </DropdownMenuLabel>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.get("/web")}>
                                                <User className="h-4 w-4" /> Dashboard
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.get("/web/my-bookings")}>
                                                <CalendarCheck className="h-4 w-4" /> My Bookings
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.get("/web/favorites")}>
                                                <Heart className="h-4 w-4" /> Favorites
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.get("/web/my-reviews")}>
                                                <Star className="h-4 w-4" /> My Reviews
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.get("/web/notifications")}>
                                                <Bell className="h-4 w-4" /> Notifications
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.get(route("profile.edit"))}>
                                                <Settings className="h-4 w-4" /> Profile Settings
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="cursor-pointer text-rose-500 focus:text-rose-500"
                                                onClick={() => router.post(route("logout"))}
                                            >
                                                <LogOut className="h-4 w-4" /> Sign Out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-3">
                                    <Button variant="outline" size="sm" asChild className="rounded-full px-4">
                                        <Link href={route("login")}>
                                            <LogIn className="mr-2 h-4 w-4" />
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button size="sm" asChild className="rounded-full px-4">
                                        <Link href={route("register")}>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            Get Started
                                        </Link>
                                    </Button>
                                </div>
                            )}

                            {/* Mobile Menu */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setMobileOpen(!mobileOpen)}
                            >
                                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Nav */}
                    {mobileOpen && (
                        <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "px-4 py-2.5 text-sm font-medium rounded-lg",
                                            url === link.href
                                                ? "text-primary bg-primary/5"
                                                : "text-muted-foreground hover:bg-accent",
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
                                    {user ? (
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={route("user.dashboard")}>Dashboard</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button variant="outline" className="flex-1 rounded-full" asChild>
                                                <Link href={route("login")}><LogIn className="mr-2 h-4 w-4" />Sign In</Link>
                                            </Button>
                                            <Button className="flex-1 rounded-full" asChild>
                                                <Link href={route("register")}><UserPlus className="mr-2 h-4 w-4" />Get Started</Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                                    H
                                </div>
                                <span className="text-xl font-bold tracking-tight">
                                    Hotel<span className="text-primary">Book</span>
                                </span>
                            </Link>
                            <p className="mt-3 text-sm text-muted-foreground">
                                Find and book the perfect hotel for your next adventure. Best prices guaranteed.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Explore</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/explore" className="hover:text-foreground transition-colors">Hotels</Link></li>
                                <li><Link href="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Support</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Account</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><Link href={route("login")} className="hover:text-foreground transition-colors">Sign In</Link></li>
                                <li><Link href={route("register")} className="hover:text-foreground transition-colors">Create Account</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} HotelBook. All rights reserved.
                    </div>
                </div>
            </footer>
            <Toaster position="top-right" closeButton richColors />
            <BackToTop />
        </div>
    );
}
