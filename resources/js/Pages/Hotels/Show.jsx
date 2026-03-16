import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import HotelMap from "@/components/HotelMap";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    Hotel,
    Star,
    MapPin,
    BedDouble,
    DollarSign,
    MessageSquare,
    CheckCircle,
    User,
} from "lucide-react";

export default function HotelShow({ hotel }) {
    const amenities = hotel.amenities || [];
    const roomTypes = hotel.room_types || [];
    const reviews = hotel.reviews || [];
    const images = hotel.images || [];

    return (
        <AuthenticatedLayout>
            <Head title={hotel.name} />

            <div className="space-y-6">
                {/* Back Button */}
                <Button variant="ghost" size="sm" asChild>
                    <Link href={route("hotels.index")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Hotels
                    </Link>
                </Button>

                {/* Header */}
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{hotel.name}</h1>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>
                                {hotel.address && `${hotel.address}, `}
                                {hotel.city}, {hotel.country}
                            </span>
                        </div>
                    </div>
                    {hotel.rating && (
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            {hotel.rating} / 5
                        </div>
                    )}
                </div>

                {/* Image Gallery */}
                {images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl overflow-hidden">
                        {images.slice(0, 3).map((image, index) => (
                            <div
                                key={index}
                                className={`${
                                    index === 0 ? "md:col-span-2 md:row-span-2 h-64 md:h-full" : "h-48"
                                } bg-zinc-100 dark:bg-zinc-800 overflow-hidden`}
                            >
                                <img
                                    src={image}
                                    alt={`${hotel.name} - ${index + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                )}

                {images.length === 0 && (
                    <div className="h-64 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                        <Hotel className="h-16 w-16 text-zinc-400" />
                    </div>
                )}

                {/* Map */}
                {(hotel.latitude && hotel.longitude) && (
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <MapPin className="h-5 w-5 text-primary" />
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        {hotel.description && (
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">About this Hotel</CardTitle>
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
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BedDouble className="h-5 w-5 text-primary" />
                                    Room Types
                                </CardTitle>
                                <CardDescription>Available rooms and pricing</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {roomTypes.length > 0 ? (
                                    <div className="space-y-4">
                                        {roomTypes.map((roomType) => {
                                            const availableRooms = roomType.rooms?.filter(
                                                (r) => r.status === "available"
                                            ) || [];
                                            return (
                                                <div
                                                    key={roomType.id}
                                                    className="p-4 rounded-xl border bg-card hover:shadow-sm transition-all"
                                                >
                                                    <div className="flex items-start justify-between flex-wrap gap-3">
                                                        <div>
                                                            <h4 className="font-semibold">{roomType.name}</h4>
                                                            {roomType.description && (
                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                    {roomType.description}
                                                                </p>
                                                            )}
                                                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                                <span className="flex items-center gap-1">
                                                                    <BedDouble className="h-3.5 w-3.5" />
                                                                    {availableRooms.length} available
                                                                </span>
                                                                {roomType.capacity && (
                                                                    <span>Up to {roomType.capacity} guests</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-primary flex items-center gap-0.5">
                                                                <DollarSign className="h-5 w-5" />
                                                                {roomType.price_per_night}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">per night</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <p className="text-muted-foreground">No room information available.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Reviews */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    Guest Reviews
                                </CardTitle>
                                <CardDescription>
                                    {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="p-4 rounded-xl bg-muted/50"
                                            >
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <User className="h-4 w-4 text-primary" />
                                                        </div>
                                                        <span className="font-medium text-sm">
                                                            {review.user?.name || "Guest"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3.5 w-3.5 ${
                                                                    i < review.rating
                                                                        ? "fill-amber-400 text-amber-400"
                                                                        : "text-zinc-300"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                {review.comment && (
                                                    <p className="text-sm text-muted-foreground mt-2">
                                                        {review.comment}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                                            <MessageSquare className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-muted-foreground font-medium">No reviews yet</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Be the first to review this hotel.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Amenities */}
                        <Card className="border-none shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    Amenities
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {amenities.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {amenities.map((amenity) => (
                                            <Badge
                                                key={amenity.id}
                                                variant="secondary"
                                                className="text-sm py-1 px-3"
                                            >
                                                {amenity.name}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No amenities listed.</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Contact / Book */}
                        <Card className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100">
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-sm">Interested in booking?</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Contact our team to make a reservation at this hotel.
                                </p>
                                <Button className="mt-4 w-full" asChild>
                                    <Link href={route("dashboard")}>
                                        Go to Dashboard
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
