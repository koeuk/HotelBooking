import { Link } from "@inertiajs/react";
import { Hotel } from "lucide-react";

export default function GuestLayout({ children }) {
    return (
        <div
            className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Centered content */}
            <div className="relative z-10 w-full max-w-md px-8 py-10 mx-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <div className="flex flex-col items-center gap-2 mb-8">
                    <div className="bg-primary p-3 rounded-full">
                        <Hotel className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white">
                        Antigravity Hotels
                    </span>
                </div>
                <div className="text-white">
                    {children}
                </div>
            </div>
        </div>
    );
}
