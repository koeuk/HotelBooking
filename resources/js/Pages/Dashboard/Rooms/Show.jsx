import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    BedDouble,
    Pencil,
    DoorOpen,
    Calendar,
    Hotel,
} from "lucide-react";

const statusColors = {
    available: "bg-green-100 text-green-800",
    booked: "bg-blue-100 text-blue-800",
    maintenance: "bg-yellow-100 text-yellow-800",
};

const bookingStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
};

export default function Show({ room }) {
    return (
        <AdminLayout>
            <Head title={`Room - ${room.room_number}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.rooms.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Room {room.room_number}
                        </h2>
                        <Badge
                            className={statusColors[room.status] || ""}
                        >
                            {room.status}
                        </Badge>
                    </div>

                    <Button asChild>
                        <Link href={route("admin.rooms.edit", room.uuid)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Room
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* Room Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DoorOpen className="h-5 w-5" /> Room
                                    Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Hotel
                                        </Label>
                                        {room.hotel ? (
                                            <p className="font-semibold text-lg">
                                                <Link
                                                    href={route(
                                                        "admin.hotels.show",
                                                        room.hotel.uuid,
                                                    )}
                                                    className="hover:underline"
                                                >
                                                    {room.hotel.name}
                                                </Link>
                                            </p>
                                        ) : (
                                            <p className="text-muted-foreground">
                                                N/A
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Room Type
                                        </Label>
                                        {room.room_type ? (
                                            <p className="font-semibold text-lg">
                                                <Link
                                                    href={route(
                                                        "admin.room-types.show",
                                                        room.room_type.uuid,
                                                    )}
                                                    className="hover:underline"
                                                >
                                                    {room.room_type.name}
                                                </Link>
                                            </p>
                                        ) : (
                                            <p className="text-muted-foreground">
                                                N/A
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Room Number
                                        </Label>
                                        <p className="font-medium">
                                            {room.room_number}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Floor
                                        </Label>
                                        <p className="font-medium">
                                            {room.floor || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Status
                                        </Label>
                                        <div className="mt-1">
                                            <Badge
                                                className={
                                                    statusColors[room.status] ||
                                                    ""
                                                }
                                            >
                                                {room.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bookings */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" /> Recent
                                    Bookings
                                    <Badge variant="secondary">
                                        {room.bookings?.length || 0}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {room.bookings &&
                                room.bookings.length > 0 ? (
                                    <div className="space-y-3">
                                        {room.bookings.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex items-center justify-between p-3 border rounded-lg"
                                            >
                                                <div>
                                                    <Link
                                                        href={route(
                                                            "admin.bookings.show",
                                                            booking.uuid,
                                                        )}
                                                        className="font-medium hover:underline"
                                                    >
                                                        {booking.user?.name ||
                                                            "Unknown User"}
                                                    </Link>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                                        <span>
                                                            {new Date(
                                                                booking.check_in_date,
                                                            ).toLocaleDateString()}{" "}
                                                            -{" "}
                                                            {new Date(
                                                                booking.check_out_date,
                                                            ).toLocaleDateString()}
                                                        </span>
                                                        <span>
                                                            $
                                                            {
                                                                booking.total_price
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                                <Badge
                                                    className={
                                                        bookingStatusColors[
                                                            booking.status
                                                        ] || ""
                                                    }
                                                >
                                                    {booking.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">
                                        No bookings found.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
