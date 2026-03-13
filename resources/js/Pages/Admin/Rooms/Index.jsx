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

const getStatusBadge = (status) => {
    switch (status) {
        case "available":
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
                    Available
                </Badge>
            );
        case "booked":
            return (
                <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800 border-blue-200"
                >
                    Booked
                </Badge>
            );
        case "maintenance":
            return <Badge variant="destructive">Maintenance</Badge>;
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

export default function Index({ rooms }) {
    const [roomToDelete, setRoomToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("admin.rooms.destroy", roomToDelete.uuid), {
            onSuccess: () => {
                setRoomToDelete(null);
                toast.success("Room deleted successfully");
            },
            onError: () => toast.error("Failed to delete room"),
        });
    };

    return (
        <AdminLayout>
            <Head title="Rooms Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Rooms
                        </h2>
                        <p className="text-muted-foreground">
                            Manage individual rooms, their floors and status.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("admin.rooms.create")}>
                            <Plus className="mr-2 h-4 w-4" /> Add Room
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Room #</TableHead>
                                <TableHead>Hotel</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Floor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rooms.data.map((room) => (
                                <TableRow key={room.id}>
                                    <TableCell className="font-medium">
                                        {room.room_number}
                                    </TableCell>
                                    <TableCell>{room.hotel.name}</TableCell>
                                    <TableCell>{room.room_type.name}</TableCell>
                                    <TableCell>{room.floor || "-"}</TableCell>
                                    <TableCell>
                                        {getStatusBadge(room.status)}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "admin.rooms.edit",
                                                    room.uuid,
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
                                                        setRoomToDelete(room)
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
                                                        room
                                                        <strong>
                                                            {" "}
                                                            {room.room_number}
                                                        </strong>{" "}
                                                        from{" "}
                                                        <strong>
                                                            {room.hotel.name}
                                                        </strong>
                                                        .
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            setRoomToDelete(
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
                                                            : "Delete Room"}
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {rooms.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No rooms found. Start by adding one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {rooms.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {rooms.links.map((link, i) => (
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
