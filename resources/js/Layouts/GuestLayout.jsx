import { Link } from "@inertiajs/react";
import { Hotel, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen">
            {/* Left side - Brand panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70" />
                <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
                <div className="absolute inset-0 noise" />

                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    <Link
                        href="/"
                        className="flex items-center gap-3 w-fit group"
                    >
                        <div className="glass p-2.5 rounded-2xl border-white/20">
                            <Hotel className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">
                            HotelBook
                        </span>
                    </Link>

                    <div className="space-y-5 animate-fade-up">
                        <Badge
                            variant="outline"
                            className="glass border-white/20 text-white"
                        >
                            <Sparkles className="h-3 w-3" />
                            Premium stays, instant booking
                        </Badge>
                        <h2 className="text-5xl font-bold leading-[1.05] tracking-tight">
                            Discover your
                            <br />
                            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                perfect getaway
                            </span>
                        </h2>
                        <p className="text-white/80 text-lg max-w-md leading-relaxed">
                            Book premium hotels worldwide with best prices
                            guaranteed. Your next adventure starts here.
                        </p>

                        <div className="flex items-center gap-6 pt-4">
                            <Stat label="Hotels" value="500+" />
                            <div className="w-px h-10 bg-white/20" />
                            <Stat label="Destinations" value="50+" />
                            <div className="w-px h-10 bg-white/20" />
                            <Stat label="Happy guests" value="10k+" />
                        </div>
                    </div>

                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} HotelBook. All rights
                        reserved.
                    </p>
                </div>
            </div>

            {/* Right - Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-mesh opacity-40 lg:opacity-0" />

                <div className="absolute top-6 left-6 lg:hidden z-10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-gradient-primary p-2 rounded-xl">
                            <Hotel className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                            HotelBook
                        </span>
                    </Link>
                </div>
                <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        shape="pill"
                        size="sm"
                        asChild
                    >
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Home
                        </Link>
                    </Button>
                </div>

                <div className="w-full max-w-[440px] relative animate-fade-up">
                    {children}
                </div>
            </div>
        </div>
    );
}

function Stat({ label, value }) {
    return (
        <div>
            <p className="text-3xl font-bold tracking-tight">{value}</p>
            <p className="text-white/60 text-sm">{label}</p>
        </div>
    );
}
