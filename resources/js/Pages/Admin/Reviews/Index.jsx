import AdminLayout from "@/Layouts/AdminLayout";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Eye, Pencil, Trash2, Star } from "lucide-react";
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
        destroy(route("admin.reviews.destroy", reviewToDelete.uuid), {
            onSuccess: () => {
                setReviewToDelete(null);
                toast.success("Review deleted successfully");
            },
            onError: () => toast.error("Failed to delete review"),
        });
    };

    return (
        <AdminLayout>
            <Head title="Reviews Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Reviews
                        </h2>
                        <p className="text-muted-foreground">
                            Manage guest reviews and ratings.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("admin.reviews.create")}>
                            <Plus className="mr-2 h-4 w-4" /> New Review
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Guest</TableHead>
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
                                    <TableCell>
                                        {review.hotel?.name}
                                    </TableCell>
                                    <TableCell>
                                        #{review.booking_id}
                                    </TableCell>
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
                                                    "admin.reviews.show",
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
                                                    "admin.reviews.edit",
                                                    review.uuid,
                                                )}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        setReviewToDelete(review)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Are you absolutely sure?
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete the
                                                        review by
                                                        <strong>
                                                            {" "}
                                                            {review.user?.name}
                                                        </strong>{" "}
                                                        for{" "}
                                                        <strong>
                                                            {review.hotel?.name}
                                                        </strong>
                                                        .
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            setReviewToDelete(
                                                                null,
                                                            )
                                                        }
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={handleDelete}
                                                        disabled={processing}
                                                    >
                                                        {processing
                                                            ? "Deleting..."
                                                            : "Delete Review"}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
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
        </AdminLayout>
    );
}
