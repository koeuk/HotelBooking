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

export default function Index({ roomTypes }) {
    const [roomTypeToDelete, setRoomTypeToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("dashboard.room-types.destroy", roomTypeToDelete.uuid), {
            onSuccess: () => {
                setRoomTypeToDelete(null);
                toast.success("Room type deleted successfully");
            },
            onError: () => toast.error("Failed to delete room type"),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Room Types Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Room Types
                        </h2>
                        <p className="text-muted-foreground">
                            Manage types of rooms offered in your hotels.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.room-types.create")}>
                            <Plus className="mr-2 h-4 w-4" /> Add Room Type
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Hotel</TableHead>
                                <TableHead>Max users</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roomTypes.data.map((type) => (
                                <TableRow key={type.id}>
                                    <TableCell className="font-medium">
                                        {type.name}
                                    </TableCell>
                                    <TableCell>{type.hotel.name}</TableCell>
                                    <TableCell>{type.max_users}</TableCell>
                                    <TableCell className="font-semibold text-primary">
                                        ${type.price_per_night}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.room-types.show",
                                                    type.uuid,
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
                                                    "dashboard.room-types.edit",
                                                    type.uuid,
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
                                                setRoomTypeToDelete(type)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {roomTypes.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No room types found. Start by adding
                                        one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {roomTypes.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {roomTypes.links.map((link, i) => (
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
                open={!!roomTypeToDelete}
                onOpenChange={(open) => {
                    if (!open) setRoomTypeToDelete(null);
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-col items-center text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
                        </div>
                        <DialogTitle className="text-center">
                            Delete Room Type
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            This action cannot be undone. This will permanently
                            delete this room type and all associated rooms and
                            bookings.
                        </DialogDescription>
                    </DialogHeader>

                    {roomTypeToDelete && (
                        <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Name</span>
                                <span className="font-medium">{roomTypeToDelete.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Hotel</span>
                                <span className="font-medium">{roomTypeToDelete.hotel.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Price per night</span>
                                <span className="font-medium">${roomTypeToDelete.price_per_night}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Max users</span>
                                <span className="font-medium">{roomTypeToDelete.max_users}</span>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setRoomTypeToDelete(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete Room Type"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
