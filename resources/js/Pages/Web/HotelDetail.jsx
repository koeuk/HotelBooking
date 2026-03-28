import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Star,
    MapPin,
    BedDouble,
    DollarSign,
    Users,
    Wifi,
    Waves,
    Dumbbell,
    Sparkles,
    UtensilsCrossed,
    Car,
    Snowflake,
    Wine,
    ConciergeBell,
} from "lucide-react";
import HotelMap from "@/components/HotelMap";

const amenityIcons = {
    wifi: Wifi,
    waves: Waves,
    pool: Waves,
    dumbbell: Dumbbell,
    gym: Dumbbell,
    sparkles: Sparkles,
    spa: Sparkles,
    utensils: UtensilsCrossed,
    restaurant: UtensilsCrossed,
    car: Car,
    parking: Car,
    snowflake: Snowflake,
    wine: Wine,
    bar: Wine,
};

export default function HotelDetail({ hotel }) {
    const { auth } = usePage().props;
    const roomTypes = hotel.room_types || [];
    const amenities = hotel.amenities || [];
    const reviews = hotel.reviews || [];
    const images = hotel.images || [];

    return (
        <WebLayout>
            <Head title={hotel.name} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back */}
                <Button variant="ghost" size="sm" className="mb-4" asChild>
                    <Link href="/explore">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hotels
                    </Link>
                </Button>

                {/* Header */}
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {hotel.name}
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4" />
                            {hotel.address && `${hotel.address}, `}
                            {hotel.city}, {hotel.country}
                        </p>
                    </div>
                    {hotel.rating > 0 && (
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-lg text-sm font-semibold">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {hotel.rating} / 5
                        </div>
                    )}
                </div>

                {/* Images */}
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden mb-8">
                        {images.slice(0, 3).map((image, i) => (
                            <div
                                key={i}
                                className={`${i === 0 ? "md:col-span-2 md:row-span-2 h-64 md:h-full" : "h-48"} bg-zinc-100 dark:bg-zinc-800 overflow-hidden`}
                            >
                                <img
                                    src={image}
                                    alt={`${hotel.name} - ${i + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-64 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center mb-8">
                        <BedDouble className="h-16 w-16 text-zinc-400" />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        {hotel.description && (
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle>About this Hotel</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {hotel.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Room Types */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2">
                                    <BedDouble className="h-5 w-5 text-primary" />{" "}
                                    Available Rooms
                                </CardTitle>
                                <CardDescription>
                                    {roomTypes.length} room types available
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {roomTypes.length > 0 ? (
                                    <div className="space-y-4">
                                        {roomTypes.map((type) => {
                                            const available = (
                                                type.rooms || []
                                            ).filter(
                                                (r) => r.status === "available",
                                            ).length;
                                            return (
                                                <div
                                                    key={type.id}
                                                    className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors"
                                                >
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold">
                                                            {type.name}
                                                        </h4>
                                                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                                            <span className="flex items-center gap-1">
                                                                <Users className="h-3.5 w-3.5" />{" "}
                                                                {type.max_users}{" "}
                                                                users
                                                            </span>
                                                            <span className="text-xs">
                                                                {available}{" "}
                                                                available
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-primary">
                                                            $
                                                            {
                                                                type.price_per_night
                                                            }
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            per night
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-center py-8">
                                        No rooms available at the moment.
                                    </p>
                                )}

                                {/* Book CTA */}
                                <div className="mt-6 p-4 bg-primary/5 rounded-xl text-center">
                                    {auth?.user ? (
                                        <Button
                                            size="lg"
                                            className="rounded-xl"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "bookings.create",
                                                    hotel.uuid,
                                                )}
                                            >
                                                Book Now
                                            </Link>
                                        </Button>
                                    ) : (
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Sign in to book this hotel
                                            </p>
                                            <Button
                                                size="lg"
                                                className="rounded-xl"
                                                asChild
                                            >
                                                <Link href={route("login")}>
                                                    Sign In to Book
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map */}
                        {hotel.latitude && hotel.longitude && (
                            <Card className="border-none shadow-sm overflow-hidden">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />{" "}
                                        Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <HotelMap
                                        latitude={hotel.latitude}
                                        longitude={hotel.longitude}
                                        name={hotel.name}
                                        className="h-[300px] w-full"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Reviews */}
                        {reviews.length > 0 && (
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-yellow-500" />{" "}
                                        user Reviews
                                    </CardTitle>
                                    <CardDescription>
                                        {reviews.length} reviews
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="p-4 rounded-xl bg-muted/50"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-sm">
                                                        {review.user?.name ||
                                                            "user"}
                                                    </span>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map(
                                                            (s) => (
                                                                <Star
                                                                    key={s}
                                                                    className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                                {review.comment && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {review.comment}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Amenities */}
                        {amenities.length > 0 && (
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">
                                        Amenities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-3">
                                        {amenities.map((a) => {
                                            const IconComponent = amenityIcons[a.icon?.toLowerCase()] || amenityIcons[a.name?.toLowerCase()] || ConciergeBell;
                                            return (
                                                <div
                                                    key={a.id}
                                                    className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors"
                                                >
                                                    <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary/10 text-primary shrink-0">
                                                        <IconComponent className="h-4.5 w-4.5" />
                                                    </div>
                                                    <span className="text-sm font-medium">{a.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Quick Info */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">
                                    Quick Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Room Types
                                    </span>
                                    <span className="font-medium">
                                        {roomTypes.length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Reviews
                                    </span>
                                    <span className="font-medium">
                                        {reviews.length}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Rating
                                    </span>
                                    <span className="font-medium flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        {hotel.rating || "—"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Location
                                    </span>
                                    <span className="font-medium">
                                        {hotel.city}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
