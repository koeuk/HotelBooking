import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import HotelMap from "@/components/HotelMap";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    Star,
    MapPin,
    BedDouble,
    Pencil,
    Users,
    ImageIcon,
    MessageSquare,
    Tags,
} from "lucide-react";

export default function Show({ hotel }) {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`h-4 w-4 ${
                        i <= Math.round(rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                    }`}
                />,
            );
        }
        return stars;
    };

    return (
        <AdminLayout>
            <Head title={`Hotel - ${hotel.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.hotels.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {hotel.name}
                        </h2>
                    </div>

                    <Button asChild>
                        <Link href={route("admin.hotels.edit", hotel.uuid)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Hotel
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* Hotel Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BedDouble className="h-5 w-5" /> Hotel
                                    Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Name
                                        </Label>
                                        <p className="font-semibold text-lg">
                                            {hotel.name}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Rating
                                        </Label>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {renderStars(hotel.rating || 0)}
                                            </div>
                                            <Badge variant="secondary">
                                                {hotel.rating || "N/A"}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                {hotel.description && (
                                    <>
                                        <div>
                                            <Label className="text-muted-foreground">
                                                Description
                                            </Label>
                                            <p className="mt-1">
                                                {hotel.description}
                                            </p>
                                        </div>
                                        <Separator />
                                    </>
                                )}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                                        <div>
                                            <Label className="text-muted-foreground">
                                                Address
                                            </Label>
                                            <p>{hotel.address}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            City
                                        </Label>
                                        <p>{hotel.city}</p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Country
                                        </Label>
                                        <p>{hotel.country}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Images */}
                        {hotel.images && hotel.images.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ImageIcon className="h-5 w-5" /> Images
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {hotel.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`${hotel.name} - ${index + 1}`}
                                                className="rounded-lg object-cover w-full h-48"
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Map */}
                        {(hotel.latitude && hotel.longitude) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5" /> Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 pb-0">
                                    <HotelMap
                                        latitude={hotel.latitude}
                                        longitude={hotel.longitude}
                                        name={hotel.name}
                                        className="h-[250px] w-full rounded-b-lg"
                                    />
                                </CardContent>
                            </Card>
                        )}

                        {/* Room Types */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BedDouble className="h-5 w-5" /> Room Types
                                    <Badge variant="secondary">
                                        {hotel.room_types?.length || 0}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {hotel.room_types &&
                                hotel.room_types.length > 0 ? (
                                    <div className="space-y-3">
                                        {hotel.room_types.map((roomType) => (
                                            <div
                                                key={roomType.id}
                                                className="flex items-center justify-between p-3 border rounded-lg"
                                            >
                                                <div>
                                                    <Link
                                                        href={route(
                                                            "admin.room-types.show",
                                                            roomType.uuid,
                                                        )}
                                                        className="font-medium hover:underline"
                                                    >
                                                        {roomType.name}
                                                    </Link>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                                        <span className="flex items-center gap-1">
                                                            <Users className="h-3 w-3" />
                                                            Max{" "}
                                                            {
                                                                roomType.max_guests
                                                            }{" "}
                                                            guests
                                                        </span>
                                                    </div>
                                                </div>
                                                <Badge variant="outline">
                                                    $
                                                    {roomType.price_per_night}
                                                    /night
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">
                                        No room types found.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Reviews */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" /> Recent
                                    Reviews
                                    <Badge variant="secondary">
                                        {hotel.reviews?.length || 0}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {hotel.reviews &&
                                hotel.reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {hotel.reviews.map((review) => (
                                            <div
                                                key={review.id}
                                                className="border rounded-lg p-4 space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium">
                                                        {review.user?.name ||
                                                            "Unknown User"}
                                                    </span>
                                                    <div className="flex">
                                                        {renderStars(
                                                            review.rating,
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
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">
                                        No reviews yet.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Amenities */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Tags className="h-5 w-5" /> Amenities
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {hotel.amenities &&
                                hotel.amenities.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {hotel.amenities.map((amenity) => (
                                            <Badge
                                                key={amenity.id}
                                                variant="secondary"
                                            >
                                                {amenity.name}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">
                                        No amenities listed.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
