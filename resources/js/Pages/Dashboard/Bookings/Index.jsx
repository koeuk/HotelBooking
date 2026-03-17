import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const getStatusBadge = (status) => {
    switch (status) {
        case "pending":
            return (
                <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800 border-yellow-200"
                >
                    Pending
                </Badge>
            );
        case "confirmed":
            return (
                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">
                    Confirmed
                </Badge>
            );
        case "cancelled":
            return <Badge variant="destructive">Cancelled</Badge>;
        case "completed":
            return (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200">
                    Completed
                </Badge>
            );
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

export default function Index({ bookings }) {
    const { delete: destroy, processing } = useForm();

    const updateStatus = (id, status) => {
        router.patch(
            route("dashboard.bookings.update", id),
            { status },
            {
                onSuccess: () => toast.success("Status updated"),
                onError: () => toast.error("Update failed"),
            },
        );
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this booking?")) {
            destroy(route("dashboard.bookings.destroy", id), {
                onSuccess: () => toast.success("Booking deleted"),
            });
        }
    };

    return (
        <DashboardLayout>
            <Head title="Bookings Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Bookings
                        </h2>
                        <p className="text-muted-foreground">
                            Monitor and manage all hotel stay reservations.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.bookings.create")}>
                            <Plus className="mr-2 h-4 w-4" /> New Booking
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>user</TableHead>
                                <TableHead>Hotel / Room</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.data.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {booking.user.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {booking.user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>{booking.room.hotel.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {booking.room.room_type.name} (Room{" "}
                                            {booking.room.room_number})
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {new Date(
                                                booking.check_in_date,
                                            ).toLocaleDateString()}{" "}
                                            -{" "}
                                            {new Date(
                                                booking.check_out_date,
                                            ).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        ${booking.total_price}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={booking.status}
                                            onValueChange={(v) =>
                                                updateStatus(booking.uuid, v)
                                            }
                                            disabled={processing}
                                        >
                                            <SelectTrigger className="w-[130px] h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="confirmed">
                                                    Confirmed
                                                </SelectItem>
                                                <SelectItem value="cancelled">
                                                    Cancelled
                                                </SelectItem>
                                                <SelectItem value="completed">
                                                    Completed
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                            title="View Details"
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.bookings.show",
                                                    booking.uuid,
                                                )}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            asChild
                                            title="Edit"
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.bookings.edit",
                                                    booking.uuid,
                                                )}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() =>
                                                handleDelete(booking.uuid)
                                            }
                                            disabled={processing}
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {bookings.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No bookings found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {bookings.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {bookings.links.map((link, i) => (
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
        </DashboardLayout>
    );
}
