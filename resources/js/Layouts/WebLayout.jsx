import { Link, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Hotel, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function WebLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = auth?.user;

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
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
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={route("dashboard")}>
                                            <User className="h-4 w-4 mr-1" />
                                            {user.name}
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={route("login")}>Sign In</Link>
                                    </Button>
                                    <Button size="sm" asChild>
                                        <Link href={route("register")}>Get Started</Link>
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
                                            <Link href={route("dashboard")}>Dashboard</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button variant="outline" className="flex-1" asChild>
                                                <Link href={route("login")}>Sign In</Link>
                                            </Button>
                                            <Button className="flex-1" asChild>
                                                <Link href={route("register")}>Get Started</Link>
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
            <main>{children}</main>

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
                                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
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
        </div>
    );
}
