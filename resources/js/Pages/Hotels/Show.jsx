import WebLayout from "@/Layouts/WebLayout";
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
import {
    ArrowLeft,
    Hotel,
    Star,
    MapPin,
    BedDouble,
    MessageSquare,
    CheckCircle2,
    User,
    Sparkles,
} from "lucide-react";
import FavoriteButton from "@/components/FavoriteButton";

export default function HotelShow({ hotel }) {
    const amenities = hotel.amenities || [];
    const roomTypes = hotel.room_types || [];
    const reviews = hotel.reviews || [];
    const images = hotel.images || [];
    const heroImage = images[0];

    return (
        <WebLayout>
            <Head title={hotel.name} />

            {/* Hero */}
            <section className="relative overflow-hidden">
                {heroImage ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-110 blur-md"
                        style={{ backgroundImage: `url(${heroImage})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-mesh" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 space-y-6">
                    <Button
                        variant="ghost"
                        shape="pill"
                        size="sm"
                        asChild
                        className="w-fit"
                    >
                        <Link href={route("hotels.index")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to hotels
                        </Link>
                    </Button>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-2 animate-fade-up">
                            <Badge
                                variant="outline"
                                className="glass border-foreground/10"
                            >
                                <Sparkles className="h-3 w-3" />
                                Featured stay
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                <span className="text-gradient-primary">
                                    {hotel.name}
                                </span>
                            </h1>
                            <p className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                {hotel.address && `${hotel.address}, `}
                                {hotel.city}, {hotel.country}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 animate-fade-up [animation-delay:80ms]">
                            <FavoriteButton
                                hotelId={hotel.id}
                                hotelUuid={hotel.uuid}
                            />
                            {hotel.rating > 0 && (
                                <div className="glass rounded-full px-4 py-2 inline-flex items-center gap-1.5 font-semibold">
                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                    {hotel.rating} / 5
                                </div>
                            )}
                            <Button
                                variant="gradient"
                                size="xl"
                                shape="pill"
                                asChild
                            >
                                <Link
                                    href={route(
                                        "bookings.create",
                                        hotel.uuid,
                                    )}
                                >
                                    Book now
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
                {/* Gallery */}
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden animate-fade-up">
                        {images.slice(0, 3).map((image, index) => (
                            <div
                                key={index}
                                className={`group overflow-hidden bg-muted ${
                                    index === 0
                                        ? "md:col-span-2 md:row-span-2 h-72 md:h-[420px]"
                                        : "h-52"
                                }`}
                            >
                                <img
                                    src={image}
                                    alt={`${hotel.name} - ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-72 rounded-3xl bg-gradient-primary-soft flex items-center justify-center">
                        <Hotel className="h-16 w-16 text-primary/60" />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {hotel.description && (
                            <Card variant="elevated" className="animate-fade-up">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">
                                        About this hotel
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {hotel.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Map */}
                        {hotel.latitude && hotel.longitude && (
                            <Card
                                variant="elevated"
                                className="overflow-hidden animate-fade-up"
                            >
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
                                        className="h-[320px] w-full"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Room Types */}
                        <Card variant="elevated" className="animate-fade-up">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <BedDouble className="h-5 w-5 text-primary" />
                                    Room types
                                </CardTitle>
                                <CardDescription>
                                    Available rooms and pricing
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {roomTypes.length > 0 ? (
                                    <div className="space-y-3">
                                        {roomTypes.map((roomType) => {
                                            const availableRooms =
                                                roomType.rooms?.filter(
                                                    (r) =>
                                                        r.status ===
                                                        "available",
                                                ) || [];
                                            return (
                                                <div
                                                    key={roomType.id}
                                                    className="p-4 rounded-2xl border border-border/60 bg-muted/20 transition-all duration-300 ease-out-expo hover:border-primary/30 hover:-translate-y-0.5"
                                                >
                                                    <div className="flex items-start justify-between flex-wrap gap-3">
                                                        <div>
                                                            <h4 className="font-semibold text-base">
                                                                {roomType.name}
                                                            </h4>
                                                            {roomType.description && (
                                                                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                                                                    {
                                                                        roomType.description
                                                                    }
                                                                </p>
                                                            )}
                                                            <div className="flex items-center gap-2 mt-2 text-xs">
                                                                <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5 text-muted-foreground">
                                                                    <BedDouble className="h-3 w-3" />
                                                                    {
                                                                        availableRooms.length
                                                                    }{" "}
                                                                    available
                                                                </span>
                                                                {roomType.capacity && (
                                                                    <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-muted-foreground">
                                                                        Up to{" "}
                                                                        {
                                                                            roomType.capacity
                                                                        }{" "}
                                                                        guests
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-gradient-primary leading-none">
                                                                $
                                                                {
                                                                    roomType.price_per_night
                                                                }
                                                            </p>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                per night
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-center text-muted-foreground py-6">
                                        No room information available.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Reviews */}
                        <Card variant="elevated" className="animate-fade-up">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <MessageSquare className="h-5 w-5 text-primary" />
                                    Guest reviews
                                </CardTitle>
                                <CardDescription>
                                    {reviews.length}{" "}
                                    {reviews.length === 1
                                        ? "review"
                                        : "reviews"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {reviews.length > 0 ? (
                                    <div className="space-y-3">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="p-4 rounded-2xl bg-muted/40"
                                            >
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground">
                                                            <User className="h-4 w-4" />
                                                        </div>
                                                        <span className="font-medium text-sm">
                                                            {review.user
                                                                ?.name ||
                                                                "Guest"}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-0.5">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-3.5 w-3.5 ${
                                                                        i <
                                                                        review.rating
                                                                            ? "fill-amber-400 text-amber-400"
                                                                            : "text-muted-foreground/40"
                                                                    }`}
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                                {review.comment && (
                                                    <p className="text-sm text-muted-foreground mt-3">
                                                        {review.comment}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="mx-auto h-12 w-12 rounded-full bg-gradient-primary-soft flex items-center justify-center mb-3">
                                            <MessageSquare className="h-6 w-6 text-primary" />
                                        </div>
                                        <p className="font-medium">
                                            No reviews yet
                                        </p>
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
                        <Card
                            variant="glass"
                            className="sticky top-24 animate-fade-up"
                        >
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                    Amenities
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
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
                                    <p className="text-sm text-muted-foreground">
                                        No amenities listed.
                                    </p>
                                )}

                                <div className="rounded-2xl bg-gradient-primary-soft p-4 text-center">
                                    <p className="text-sm font-medium">
                                        Ready when you are
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Reserve in seconds. Pay after
                                        confirmation.
                                    </p>
                                    <Button
                                        variant="gradient"
                                        size="xl"
                                        shape="pill"
                                        className="mt-4 w-full"
                                        asChild
                                    >
                                        <Link
                                            href={route(
                                                "bookings.create",
                                                hotel.uuid,
                                            )}
                                        >
                                            Book this hotel
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}
