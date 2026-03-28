import { Link } from "@inertiajs/react";
import { Hotel } from "lucide-react";

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen">
            {/* Left side - Background image */}
            <div
                className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-black/70" />
                <div className="relative z-10 flex flex-col justify-between p-12 text-white">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                            <Hotel className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">HotelBook</span>
                    </Link>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold leading-tight">
                            Discover Your Perfect<br />Getaway
                        </h2>
                        <p className="text-white/80 text-lg max-w-md">
                            Book premium hotels worldwide with the best prices guaranteed. Your next adventure starts here.
                        </p>
                        <div className="flex items-center gap-8 pt-4">
                            <div>
                                <p className="text-3xl font-bold">500+</p>
                                <p className="text-white/60 text-sm">Hotels</p>
                            </div>
                            <div className="w-px h-10 bg-white/20" />
                            <div>
                                <p className="text-3xl font-bold">50+</p>
                                <p className="text-white/60 text-sm">Destinations</p>
                            </div>
                            <div className="w-px h-10 bg-white/20" />
                            <div>
                                <p className="text-3xl font-bold">10k+</p>
                                <p className="text-white/60 text-sm">Happy Guests</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} HotelBook. All rights reserved.</p>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-background">
                {/* Mobile logo */}
                <div className="absolute top-6 left-6 lg:hidden">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-lg">
                            <Hotel className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">HotelBook</span>
                    </Link>
                </div>

                <div className="w-full max-w-[420px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
