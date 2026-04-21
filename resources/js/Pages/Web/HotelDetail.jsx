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
import FavoriteButton from "@/components/FavoriteButton";

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
                        <Link href="/explore">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to
                            hotels
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
                            {auth?.user ? (
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
                            ) : (
                                <Button
                                    variant="gradient"
                                    size="xl"
                                    shape="pill"
                                    asChild
                                >
                                    <Link href={route("login")}>
                                        Sign in to book
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
                {/* Gallery */}
                {images.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden animate-fade-up">
                        {images.slice(0, 3).map((image, i) => (
                            <div
                                key={i}
                                className={`group overflow-hidden bg-muted ${
                                    i === 0
                                        ? "md:col-span-2 md:row-span-2 h-72 md:h-[420px]"
                                        : "h-52"
                                }`}
                            >
                                <img
                                    src={image}
                                    alt={`${hotel.name} - ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-72 rounded-3xl bg-gradient-primary-soft flex items-center justify-center">
                        <BedDouble className="h-16 w-16 text-primary/60" />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {hotel.description && (
                            <Card variant="elevated" className="animate-fade-up">
                                <CardHeader className="pb-3">
                                    <CardTitle>About this hotel</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {hotel.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Rooms */}
                        <Card variant="elevated" className="animate-fade-up">
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2">
                                    <BedDouble className="h-5 w-5 text-primary" />
                                    Available rooms
                                </CardTitle>
                                <CardDescription>
                                    {roomTypes.length} room types available
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {roomTypes.length > 0 ? (
                                    <div className="space-y-3">
                                        {roomTypes.map((type) => {
                                            const available = (
                                                type.rooms || []
                                            ).filter(
                                                (r) =>
                                                    r.status === "available",
                                            ).length;
                                            return (
                                                <div
                                                    key={type.id}
                                                    className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 transition-all duration-300 ease-out-expo hover:bg-muted/60 hover:-translate-y-0.5"
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold">
                                                            {type.name}
                                                        </h4>
                                                        <div className="flex items-center gap-2 mt-1.5 text-xs">
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5 text-muted-foreground">
                                                                <Users className="h-3 w-3" />
                                                                {type.max_users}{" "}
                                                                guests
                                                            </span>
                                                            <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-muted-foreground">
                                                                {available}{" "}
                                                                available
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right shrink-0 ml-3">
                                                        <p className="text-xl font-bold text-gradient-primary leading-none">
                                                            $
                                                            {
                                                                type.price_per_night
                                                            }
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
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

                                <div className="mt-6 rounded-2xl bg-gradient-primary-soft p-5 text-center">
                                    {auth?.user ? (
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
                                    ) : (
                                        <>
                                            <p className="text-sm text-muted-foreground mb-3">
                                                Sign in to book this hotel
                                            </p>
                                            <Button
                                                variant="gradient"
                                                size="xl"
                                                shape="pill"
                                                asChild
                                            >
                                                <Link href={route("login")}>
                                                    Sign in to book
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Map */}
                        {hotel.latitude && hotel.longitude && (
                            <Card
                                variant="elevated"
                                className="overflow-hidden animate-fade-up"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
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

                        {/* Reviews */}
                        {reviews.length > 0 && (
                            <Card variant="elevated" className="animate-fade-up">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-amber-500" />
                                        Guest reviews
                                    </CardTitle>
                                    <CardDescription>
                                        {reviews.length} reviews
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="p-4 rounded-2xl bg-muted/40"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-medium text-sm">
                                                        {review.user?.name ||
                                                            "Guest"}
                                                    </span>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map(
                                                            (s) => (
                                                                <Star
                                                                    key={s}
                                                                    className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40"}`}
                                                                />
                                                            ),
                                                        )}
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
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {amenities.length > 0 && (
                            <Card
                                variant="glass"
                                className="animate-fade-up"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">
                                        Amenities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-2">
                                        {amenities.map((a) => {
                                            const IconComponent =
                                                amenityIcons[
                                                    a.icon?.toLowerCase()
                                                ] ||
                                                amenityIcons[
                                                    a.name?.toLowerCase()
                                                ] ||
                                                ConciergeBell;
                                            return (
                                                <div
                                                    key={a.id}
                                                    className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/30 transition-colors hover:bg-muted/50"
                                                >
                                                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-primary text-primary-foreground shrink-0">
                                                        <IconComponent className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm font-medium truncate">
                                                        {a.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Card variant="elevated" className="animate-fade-up">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">
                                    Quick info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <Row
                                    label="Room types"
                                    value={roomTypes.length}
                                />
                                <Row
                                    label="Reviews"
                                    value={reviews.length}
                                />
                                <Row
                                    label="Rating"
                                    value={
                                        <span className="inline-flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                            {hotel.rating || "—"}
                                        </span>
                                    }
                                />
                                <Row label="Location" value={hotel.city} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{value}</span>
        </div>
    );
}
