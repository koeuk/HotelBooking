import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

export default function Create({ users, hotels, bookings }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        hotel_id: "",
        booking_id: "",
        rating: "",
        comment: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.reviews.store"));
    };

    return (
        <AdminLayout>
            <Head title="Add Review" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.reviews.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Add Review
                    </h2>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Details</CardTitle>
                            <CardDescription>
                                Enter the details for the new review.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="user_id">Guest</Label>
                                    <Select
                                        value={data.user_id}
                                        onValueChange={(value) =>
                                            setData("user_id", value)
                                        }
                                    >
                                        <SelectTrigger id="user_id">
                                            <SelectValue placeholder="Select a guest" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={String(user.id)}
                                                >
                                                    {user.name} ({user.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.user_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.user_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="hotel_id">Hotel</Label>
                                    <Select
                                        value={data.hotel_id}
                                        onValueChange={(value) =>
                                            setData("hotel_id", value)
                                        }
                                    >
                                        <SelectTrigger id="hotel_id">
                                            <SelectValue placeholder="Select a hotel" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hotels.map((hotel) => (
                                                <SelectItem
                                                    key={hotel.id}
                                                    value={String(hotel.id)}
                                                >
                                                    {hotel.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.hotel_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.hotel_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="booking_id">Booking</Label>
                                    <Select
                                        value={data.booking_id}
                                        onValueChange={(value) =>
                                            setData("booking_id", value)
                                        }
                                    >
                                        <SelectTrigger id="booking_id">
                                            <SelectValue placeholder="Select a booking" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bookings.map((booking) => (
                                                <SelectItem
                                                    key={booking.id}
                                                    value={String(booking.id)}
                                                >
                                                    Booking #{booking.id}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.booking_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.booking_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Select
                                        value={data.rating}
                                        onValueChange={(value) =>
                                            setData("rating", value)
                                        }
                                    >
                                        <SelectTrigger id="rating">
                                            <SelectValue placeholder="Select a rating" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <SelectItem
                                                    key={num}
                                                    value={String(num)}
                                                >
                                                    {num} {num === 1 ? "Star" : "Stars"}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.rating && (
                                        <p className="text-sm text-destructive">
                                            {errors.rating}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Textarea
                                    id="comment"
                                    value={data.comment}
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                    placeholder="Write the review comment..."
                                    rows={5}
                                />
                                {errors.comment && (
                                    <p className="text-sm text-destructive">
                                        {errors.comment}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                            <Button variant="outline" asChild>
                                <Link href={route("admin.reviews.index")}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Create Review"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
