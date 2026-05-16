import UserLayout from "@/Layouts/UserLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    CalendarCheck,
    CalendarClock,
    DollarSign,
    Clock,
    Hotel,
    Star,
    MapPin,
    BedDouble,
    ArrowRight,
    Luggage,
    CreditCard,
} from "lucide-react";

const getStatusBadge = (status) => {
    const styles = {
        pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
        confirmed: "bg-green-100 text-green-800 border-green-200",
        cancelled: "bg-red-100 text-red-800 border-red-200",
        completed: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return (
        <Badge variant="outline" className={styles[status] || ""}>
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
        </Badge>
    );
};

const getPaymentBadge = (payment) => {
    if (!payment) return <Badge variant="outline" className="text-muted-foreground">Unpaid</Badge>;
    if (payment.status === "paid") return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
    return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{payment.status}</Badge>;
};

export default function Dashboard({ stats, upcomingBookings, recentBookings, featuredHotels }) {
    const { auth } = usePage().props;
    const user = auth.user;

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    return (
        <UserLayout title="User Dashboard">
            <Head title="Dashboard" />

            <div className="space-y-8">
                    {/* Welcome Section */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-8 text-white shadow-lg">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
                        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                        <div className="absolute right-8 bottom-4 opacity-10">
                            <Hotel className="h-32 w-32" />
                        </div>
                        <div className="relative">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {greeting()}, {user.name}!
                            </h1>
                            <p className="mt-2 text-white/80 max-w-lg">
                                Welcome to your hotel booking dashboard. View your reservations, track your stays, and discover new destinations.
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                                        <p className="text-3xl font-bold mt-1">{stats.total_bookings}</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                        <CalendarCheck className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
                                        <p className="text-3xl font-bold mt-1">{stats.confirmed_bookings}</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                                        <Luggage className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                        <p className="text-3xl font-bold mt-1">{stats.pending_bookings}</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                        <Clock className="h-6 w-6 text-yellow-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                                        <p className="text-3xl font-bold mt-1">
                                            ${Number(stats.total_spent).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        </p>
                                    </div>
                                    <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                        <DollarSign className="h-6 w-6 text-emerald-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Upcoming Bookings */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <CalendarClock className="h-5 w-5 text-primary" />
                                                Upcoming Stays
                                            </CardTitle>
                                            <CardDescription>Your next scheduled check-ins</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {upcomingBookings.length > 0 ? (
                                        <div className="space-y-4">
                                            {upcomingBookings.map((booking) => (
                                                <div
                                                    key={booking.id}
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                                                >
                                                    <div className="hidden sm:flex h-14 w-14 rounded-xl bg-primary/10 items-center justify-center shrink-0">
                                                        <Hotel className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className="font-semibold truncate">
                                                                {booking.room.hotel.name}
                                                            </p>
                                                            {getStatusBadge(booking.status)}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground mt-0.5">
                                                            {booking.room.room_type.name} &middot; Room #{booking.room.room_number}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {new Date(booking.check_in_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                            {" "}&rarr;{" "}
                                                            {new Date(booking.check_out_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                        </p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="font-bold text-lg">${booking.total_price}</p>
                                                        {getPaymentBadge(booking.payment)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                                <CalendarClock className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <p className="text-muted-foreground font-medium">No upcoming stays</p>
                                            <p className="text-sm text-muted-foreground mt-1">Your next trips will appear here</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Recent Bookings Table */}
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                        Recent Bookings
                                    </CardTitle>
                                    <CardDescription>Your latest reservation history</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {recentBookings.length > 0 ? (
                                        <div className="rounded-lg border overflow-hidden">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="bg-muted/50">
                                                        <TableHead>Hotel</TableHead>
                                                        <TableHead className="hidden sm:table-cell">Room</TableHead>
                                                        <TableHead>Dates</TableHead>
                                                        <TableHead>Amount</TableHead>
                                                        <TableHead>Status</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {recentBookings.map((booking) => (
                                                        <TableRow key={booking.id}>
                                                            <TableCell>
                                                                <div className="font-medium">{booking.room.hotel.name}</div>
                                                                <div className="text-xs text-muted-foreground sm:hidden">
                                                                    {booking.room.room_type.name}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell">
                                                                <div className="text-sm">{booking.room.room_type.name}</div>
                                                                <div className="text-xs text-muted-foreground">#{booking.room.room_number}</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="text-sm">
                                                                    {new Date(booking.check_in_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                                    {" - "}
                                                                    {new Date(booking.check_out_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="font-semibold">${booking.total_price}</TableCell>
                                                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-12 text-center">
                                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                                <CreditCard className="h-8 w-8 text-muted-foreground" />
                                            </div>
                                            <p className="text-muted-foreground font-medium">No bookings yet</p>
                                            <p className="text-sm text-muted-foreground mt-1">Your reservation history will show here</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar - Featured Hotels */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Star className="h-5 w-5 text-amber-500" />
                                        Top Rated Hotels
                                    </CardTitle>
                                    <CardDescription>Discover our best properties</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {featuredHotels.map((hotel) => (
                                            <div
                                                key={hotel.id}
                                                className="group p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="min-w-0 flex-1">
                                                        <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
                                                            {hotel.name}
                                                        </h4>
                                                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                                                            <MapPin className="h-3.5 w-3.5" />
                                                            <span className="truncate">{hotel.city}, {hotel.country}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-sm font-medium shrink-0 ml-2">
                                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                                        {hotel.rating}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                                                    <BedDouble className="h-3.5 w-3.5" />
                                                    <span>{hotel.rooms_count} rooms available</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Info Card */}
                            <Card className="border-none shadow-sm bg-gradient-to-br from-slate-50 to-slate-100">
                                <CardContent className="p-6">
                                    <h4 className="font-semibold text-sm">Need help?</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Contact our support team for any booking inquiries or assistance.
                                    </p>
                                    <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                                        <Link href={route("profile.edit")}>
                                            Manage Profile
                                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
        </UserLayout>
    );
}
