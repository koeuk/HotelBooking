import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronLeft, Hotel, MessageSquare } from "lucide-react";

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-4 w-4 ${
                        star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-300 dark:text-zinc-600"
                    }`}
                />
            ))}
        </div>
    );
}

export default function Index({ reviews }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Reviews" />

            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        My Reviews
                    </h2>
                    <p className="text-muted-foreground">
                        Your ratings and feedback for hotels you've stayed at.
                    </p>
                </div>

                {reviews.data.length === 0 ? (
                    <Card className="border-none shadow-sm">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4">
                                <MessageSquare className="h-8 w-8 text-zinc-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">
                                No reviews yet
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                After completing a stay, you can leave a review
                                for the hotel.
                            </p>
                            <Button asChild>
                                <Link href={route("bookings.index")}>
                                    View My Bookings
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {reviews.data.map((review) => (
                            <Card
                                key={review.id}
                                className="border-none shadow-sm"
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Hotel className="h-5 w-5 text-muted-foreground" />
                                                <h3 className="font-semibold text-lg">
                                                    {review.hotel?.name}
                                                </h3>
                                            </div>
                                            <StarRating
                                                rating={review.rating}
                                            />
                                            {review.comment && (
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {review.comment}
                                                </p>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Booking #{review.booking_id} &middot;{" "}
                                                {new Date(
                                                    review.created_at,
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="text-lg px-3"
                                        >
                                            {review.rating}/5
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {reviews.links?.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {reviews.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                asChild={!!link.url}
                                disabled={!link.url}
                                className={!link.url ? "opacity-50" : ""}
                            >
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
