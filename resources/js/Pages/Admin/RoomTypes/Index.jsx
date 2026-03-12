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
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Index({ roomTypes }) {
    const [roomTypeToDelete, setRoomTypeToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("admin.room-types.destroy", roomTypeToDelete.id), {
            onSuccess: () => {
                setRoomTypeToDelete(null);
                toast.success("Room type deleted successfully");
            },
            onError: () => toast.error("Failed to delete room type"),
        });
    };

    return (
        <AdminLayout>
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
                        <Link href={route("admin.room-types.create")}>
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
                                <TableHead>Max Guests</TableHead>
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
                                    <TableCell>{type.max_guests}</TableCell>
                                    <TableCell className="font-semibold text-primary">
                                        ${type.price_per_night}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "admin.room-types.edit",
                                                    type.id,
                                                )}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() =>
                                                        setRoomTypeToDelete(
                                                            type,
                                                        )
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
                                                        room type
                                                        <strong>
                                                            {" "}
                                                            {type.name}
                                                        </strong>{" "}
                                                        and all associated rooms
                                                        and bookings.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            setRoomTypeToDelete(
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
                                                            : "Delete Room Type"}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
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
        </AdminLayout>
    );
}
