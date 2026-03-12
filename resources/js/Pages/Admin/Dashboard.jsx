import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Hotel, Bed, CalendarCheck, DollarSign, Clock } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, description }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
    </Card>
);

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

export default function Dashboard({ stats, recent_bookings }) {
    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard Overview
                    </h2>
                    <p className="text-muted-foreground">
                        Monitor your hotel's performance and recent activities.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        title="Total Hotels"
                        value={stats.total_hotels}
                        icon={Hotel}
                        description="Active properties"
                    />
                    <StatCard
                        title="Total Rooms"
                        value={stats.total_rooms}
                        icon={Bed}
                        description="Across all hotels"
                    />
                    <StatCard
                        title="Total Bookings"
                        value={stats.total_bookings}
                        icon={CalendarCheck}
                        description="Lifetime bookings"
                    />
                    <StatCard
                        title="Revenue"
                        value={`$${stats.total_revenue}`}
                        icon={DollarSign}
                        description="Total paid amount"
                    />
                    <StatCard
                        title="Pending"
                        value={stats.pending_bookings}
                        icon={Clock}
                        description="Awaiting review"
                    />
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Hotel / Room</TableHead>
                                    <TableHead>Check In</TableHead>
                                    <TableHead>Total Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recent_bookings.map((booking) => (
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
                                                Room: {booking.room.room_number}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                booking.check_in_date,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            ${booking.total_price}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(booking.status)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link
                                                href={route(
                                                    "admin.bookings.show",
                                                    booking.id,
                                                )}
                                                className="text-sm text-primary hover:underline"
                                            >
                                                View Details
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {recent_bookings.length === 0 && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={6}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            No recent bookings found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
