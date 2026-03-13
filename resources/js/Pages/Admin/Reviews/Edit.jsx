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
import { toast } from "sonner";

export default function Edit({ review, users, hotels }) {
    const { data, setData, put, processing, errors } = useForm({
        rating: String(review.rating) || "",
        comment: review.comment || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.reviews.update", review.id), {
            onSuccess: () => toast.success("Review updated successfully"),
            onError: () => toast.error("Failed to update review"),
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Review" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.reviews.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Edit Review
                    </h2>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Review Details</CardTitle>
                            <CardDescription>
                                Update the review by{" "}
                                <strong>{review.user?.name}</strong> for{" "}
                                <strong>{review.hotel?.name}</strong>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Guest</Label>
                                    <p className="text-sm text-muted-foreground pt-2">
                                        {review.user?.name} ({review.user?.email})
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Hotel</Label>
                                    <p className="text-sm text-muted-foreground pt-2">
                                        {review.hotel?.name}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Booking</Label>
                                    <p className="text-sm text-muted-foreground pt-2">
                                        Booking #{review.booking_id}
                                    </p>
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
                                {processing ? "Saving..." : "Update Review"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
