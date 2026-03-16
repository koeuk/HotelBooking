import WebLayout from "@/Layouts/WebLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Heart,
    ArrowRight,
} from "lucide-react";

export default function FavoritesIndex() {
    return (
        <WebLayout>
            <Head title="My Favorites" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {/* Header */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 via-rose-500 to-pink-600 p-8 text-white shadow-lg">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                    <div className="absolute right-8 bottom-4 opacity-10">
                        <Heart className="h-32 w-32" />
                    </div>
                    <div className="relative">
                        <h1 className="text-3xl font-bold tracking-tight">My Favorites</h1>
                        <p className="mt-2 text-white/80 max-w-lg">
                            Keep track of hotels you love and want to visit.
                        </p>
                    </div>
                </div>

                {/* Empty State */}
                <Card className="border-none shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="h-16 w-16 rounded-full bg-rose-50 flex items-center justify-center mb-4">
                                <Heart className="h-8 w-8 text-rose-400" />
                            </div>
                            <p className="text-muted-foreground font-medium text-lg">No favorites yet</p>
                            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                                Browse hotels and save your favorites to easily find them later.
                            </p>
                            <Button variant="outline" className="mt-6" asChild>
                                <Link href={route("hotels.index")}>
                                    Browse Hotels
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </WebLayout>
    );
}
