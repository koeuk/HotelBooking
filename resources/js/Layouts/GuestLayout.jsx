import { Link } from "@inertiajs/react";
import { Hotel } from "lucide-react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {/* Left side: Content */}
            <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-background">
                <div className="w-full max-w-sm mx-auto lg:w-96">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-primary p-2 rounded-lg">
                            <Hotel className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            Antigravity Hotels
                        </span>
                    </div>
                    {children}
                </div>
            </div>

            {/* Right side: Image/Banner */}
            <div className="relative flex-1 hidden w-0 lg:block">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
                <img
                    className="absolute inset-0 object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Hotel"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold mb-4">
                            Experience the height of luxury.
                        </h2>
                        <p className="text-lg opacity-90">
                            Book your stay at the world's finest hotels with our
                            seamless booking experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
