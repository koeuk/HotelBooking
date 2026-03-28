import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Eye, Pencil, Trash2, Star, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-4 w-4 ${
                        star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                    }`}
                />
            ))}
        </div>
    );
}

export default function Index({ reviews }) {
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("dashboard.reviews.destroy", reviewToDelete.uuid), {
            onSuccess: () => {
                setReviewToDelete(null);
                toast.success("Review deleted successfully");
            },
            onError: () => toast.error("Failed to delete review"),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Reviews Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Reviews
                        </h2>
                        <p className="text-muted-foreground">
                            Manage user reviews and ratings.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.reviews.create")}>
                            <Plus className="mr-2 h-4 w-4" /> New Review
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>user</TableHead>
                                <TableHead>Hotel</TableHead>
                                <TableHead>Booking #</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Comment</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reviews.data.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {review.user?.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {review.user?.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>{review.hotel?.name}</TableCell>
                                    <TableCell>#{review.booking_id}</TableCell>
                                    <TableCell>
                                        <StarRating rating={review.rating} />
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate">
                                        {review.comment}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.reviews.show",
                                                    review.uuid,
                                                )}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.reviews.edit",
                                                    review.uuid,
                                                )}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() =>
                                                setReviewToDelete(review)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {reviews.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No reviews found. Start by adding one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {reviews.links.length > 3 && (
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

            <Dialog open={!!reviewToDelete} onOpenChange={(open) => !open && setReviewToDelete(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center sm:text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-7 w-7 text-destructive" />
                        </div>
                        <DialogTitle className="text-xl">Delete Review</DialogTitle>
                        <DialogDescription className="pt-2 text-center">
                            Are you sure? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {reviewToDelete && (
                        <div className="rounded-xl bg-muted/50 p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">User</span>
                                <span className="font-medium">{reviewToDelete.user?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Hotel</span>
                                <span className="font-medium">{reviewToDelete.hotel?.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Rating</span>
                                <span className="font-medium">{reviewToDelete.rating} / 5</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Comment</span>
                                <span className="font-medium truncate max-w-[200px]">
                                    {reviewToDelete.comment?.length > 50
                                        ? reviewToDelete.comment.substring(0, 50) + "..."
                                        : reviewToDelete.comment}
                                </span>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" className="flex-1" onClick={() => setReviewToDelete(null)}>Cancel</Button>
                        <Button variant="destructive" className="flex-1" onClick={handleDelete} disabled={processing}>
                            {processing ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
