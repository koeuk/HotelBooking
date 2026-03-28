import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Edit, Trash2, Plus, AlertTriangle, CalendarCheck, Clock, XCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Index({ bookings }) {
    const { delete: destroy, processing } = useForm();
    const [bookingToDelete, setBookingToDelete] = useState(null);

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

    const handleDelete = () => {
        destroy(route("dashboard.bookings.destroy", bookingToDelete.uuid), {
            onSuccess: () => {
                setBookingToDelete(null);
                toast.success("Booking deleted");
            },
            onError: () => toast.error("Failed to delete booking"),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Bookings Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
                        <p className="text-muted-foreground">Monitor and manage all hotel stay reservations.</p>
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
                                <TableHead>User</TableHead>
                                <TableHead>Hotel / Room</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.data.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>
                                        <div className="font-medium">{booking.user.name}</div>
                                        <div className="text-xs text-muted-foreground">{booking.user.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div>{booking.room.hotel.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {booking.room.room_type.name} (Room {booking.room.room_number})
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {new Date(booking.check_in_date).toLocaleDateString()} -{" "}
                                            {new Date(booking.check_out_date).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">${booking.total_price}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={booking.status}
                                            onValueChange={(v) => updateStatus(booking.uuid, v)}
                                            disabled={processing}
                                        >
                                            <SelectTrigger className="w-[130px] h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                                <SelectItem value="cancelled">Cancelled</SelectItem>
                                                <SelectItem value="completed">Completed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                <Link href={route("dashboard.bookings.show", booking.uuid)}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                <Link href={route("dashboard.bookings.edit", booking.uuid)}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive"
                                                onClick={() => setBookingToDelete(booking)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {bookings.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12">
                                        <CalendarCheck className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                                        <p className="text-muted-foreground">No bookings found.</p>
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
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!bookingToDelete} onOpenChange={(open) => !open && setBookingToDelete(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center sm:text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-7 w-7 text-destructive" />
                        </div>
                        <DialogTitle className="text-xl">Delete Booking</DialogTitle>
                        <DialogDescription className="pt-2 text-center">
                            Are you sure you want to delete this booking? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    {bookingToDelete && (
                        <div className="rounded-xl bg-muted/50 p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Guest</span>
                                <span className="font-medium">{bookingToDelete.user.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Hotel</span>
                                <span className="font-medium">{bookingToDelete.room.hotel.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Room</span>
                                <span className="font-medium">{bookingToDelete.room.room_type.name} (#{bookingToDelete.room.room_number})</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total</span>
                                <span className="font-bold text-primary">${bookingToDelete.total_price}</span>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" className="flex-1" onClick={() => setBookingToDelete(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" className="flex-1" onClick={handleDelete} disabled={processing}>
                            {processing ? "Deleting..." : "Delete Booking"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
