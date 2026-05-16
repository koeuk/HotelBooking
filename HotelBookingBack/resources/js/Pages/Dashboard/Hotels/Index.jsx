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
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, Edit, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Index({ hotels }) {
    const [hotelToDelete, setHotelToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("dashboard.hotels.destroy", hotelToDelete.uuid), {
            onSuccess: () => {
                setHotelToDelete(null);
                toast.success("Hotel deleted successfully");
            },
            onError: () => toast.error("Failed to delete hotel"),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Hotels Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Hotels
                        </h2>
                        <p className="text-muted-foreground">
                            Manage your properties and their details.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.hotels.create")}>
                            <Plus className="mr-2 h-4 w-4" /> Add Hotel
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>City / Country</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {hotels.data.map((hotel) => (
                                <TableRow key={hotel.id}>
                                    <TableCell className="font-medium">
                                        {hotel.name}
                                    </TableCell>
                                    <TableCell>
                                        {hotel.city}, {hotel.country}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="font-bold rounded-full"
                                        >
                                            {hotel.rating} ★
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.hotels.show",
                                                    hotel.uuid,
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
                                                    "dashboard.hotels.edit",
                                                    hotel.uuid,
                                                )}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() =>
                                                setHotelToDelete(hotel)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {hotels.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No hotels found. Start by adding one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination (Simplified) */}
                {hotels.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {hotels.links.map((link, i) => (
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!hotelToDelete}
                onOpenChange={(open) => {
                    if (!open) setHotelToDelete(null);
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-col items-center text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
                        </div>
                        <DialogTitle className="text-center">
                            Delete Hotel
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            This action cannot be undone. This will permanently
                            delete this hotel and all associated rooms and
                            bookings.
                        </DialogDescription>
                    </DialogHeader>

                    {hotelToDelete && (
                        <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Hotel</span>
                                <span className="font-medium">{hotelToDelete.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">City</span>
                                <span className="font-medium">{hotelToDelete.city}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Rating</span>
                                <span className="font-medium">{hotelToDelete.rating} ★</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Rooms</span>
                                <span className="font-medium">{hotelToDelete.rooms_count ?? "N/A"}</span>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setHotelToDelete(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete Hotel"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
