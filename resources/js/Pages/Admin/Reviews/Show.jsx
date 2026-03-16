import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
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
    Edit,
    Star,
    User,
    Hotel,
    Calendar,
    MessageSquare,
} from "lucide-react";

export default function Show({ review }) {
    return (
        <AdminLayout>
            <Head title={`Review #${review.id}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.reviews.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Review Details
                        </h2>
                    </div>
                    <Button asChild>
                        <Link
                            href={route("admin.reviews.edit", review.uuid)}
                        >
                            <Edit className="mr-2 h-4 w-4" /> Edit Review
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Rating & Comment */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Star className="h-5 w-5" /> Rating &
                                    Comment
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-muted-foreground">
                                        Rating
                                    </Label>
                                    <div className="flex items-center gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-6 w-6 ${
                                                    star <= review.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                }`}
                                            />
                                        ))}
                                        <span className="ml-2 text-lg font-semibold">
                                            {review.rating}/5
                                        </span>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <Label className="text-muted-foreground">
                                        Comment
                                    </Label>
                                    <div className="mt-2 p-4 bg-muted rounded-lg">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground mb-2" />
                                        <p className="text-sm leading-relaxed">
                                            {review.comment ||
                                                "No comment provided."}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <Label className="text-muted-foreground">
                                        Created
                                    </Label>
                                    <p className="text-sm mt-1">
                                        {new Date(
                                            review.created_at
                                        ).toLocaleDateString(undefined, {
                                            dateStyle: "long",
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Related Info */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" /> Guest
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {review.user ? (
                                    <div className="space-y-2">
                                        <p className="font-semibold">
                                            {review.user.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {review.user.email}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-2"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "admin.users.show",
                                                    review.user.uuid
                                                )}
                                            >
                                                View User
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        User not found.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hotel className="h-5 w-5" /> Hotel
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {review.hotel ? (
                                    <div className="space-y-2">
                                        <p className="font-semibold">
                                            {review.hotel.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {review.hotel.city},{" "}
                                            {review.hotel.country}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-2"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "admin.hotels.show",
                                                    review.hotel.uuid
                                                )}
                                            >
                                                View Hotel
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">
                                        Hotel not found.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {review.booking && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />{" "}
                                        Booking
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <p className="text-sm">
                                            <span className="text-muted-foreground">
                                                Room:{" "}
                                            </span>
                                            {review.booking.room?.room_number ||
                                                "N/A"}
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-muted-foreground">
                                                Check-in:{" "}
                                            </span>
                                            {new Date(
                                                review.booking.check_in_date
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm">
                                            <span className="text-muted-foreground">
                                                Check-out:{" "}
                                            </span>
                                            {new Date(
                                                review.booking.check_out_date
                                            ).toLocaleDateString()}
                                        </p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-2"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "admin.bookings.show",
                                                    review.booking.uuid
                                                )}
                                            >
                                                View Booking
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
