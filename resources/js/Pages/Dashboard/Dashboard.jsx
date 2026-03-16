import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Hotel,
    Bed,
    CalendarCheck,
    DollarSign,
    Clock,
    TrendingUp,
    ArrowUpRight,
    Plus,
    Users,
    ChevronRight,
    ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const StatCard = ({
    title,
    value,
    icon: Icon,
    description,
    trend,
    trendValue,
    colorClass,
}) => (
    <Card className="relative overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-zinc-950">
        <div
            className={cn(
                "absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 group-hover:scale-125 transition-transform duration-500",
                colorClass,
            )}
        />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {title}
            </CardTitle>
            <div className={cn("p-2 rounded-lg", colorClass, "bg-opacity-10")}>
                <Icon
                    className={cn(
                        "h-4 w-4",
                        colorClass.replace("bg-", "text-"),
                    )}
                />
            </div>
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold tracking-tight">{value}</div>
            <div className="flex items-center mt-2">
                {trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                ) : (
                    <Clock className="h-3 w-3 text-amber-500 mr-1" />
                )}
                <p className="text-xs font-medium">
                    <span
                        className={cn(
                            trend === "up"
                                ? "text-emerald-500"
                                : "text-amber-500",
                        )}
                    >
                        {trendValue}
                    </span>
                    <span className="text-muted-foreground ml-1">
                        {description}
                    </span>
                </p>
            </div>
        </CardContent>
    </Card>
);

const getStatusBadge = (status) => {
    switch (status) {
        case "pending":
            return (
                <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 shrink-0"
                >
                    <Clock className="w-3 h-3 mr-1" /> Pending
                </Badge>
            );
        case "confirmed":
            return (
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 shrink-0">
                    <CalendarCheck className="w-3 h-3 mr-1" /> Confirmed
                </Badge>
            );
        case "cancelled":
            return (
                <Badge
                    variant="destructive"
                    className="bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800 shrink-0"
                >
                    Cancelled
                </Badge>
            );
        case "completed":
            return (
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 shrink-0">
                    Completed
                </Badge>
            );
        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

const STATUS_COLORS = {
    pending: "#f59e0b",
    confirmed: "#10b981",
    completed: "#3b82f6",
    cancelled: "#ef4444",
};

const ROLE_COLORS = {
    admin: "#6366f1",
    user: "#3b82f6",
};

const RATING_COLORS = ["#ef4444", "#f59e0b", "#eab308", "#84cc16", "#10b981"];

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-popover border rounded-lg shadow-lg p-3 text-sm">
            <p className="font-bold mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} style={{ color: entry.color }} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    {entry.name}: {entry.name === "Revenue" ? `$${entry.value}` : entry.value}
                </p>
            ))}
        </div>
    );
};

export default function Dashboard({ stats, recent_bookings, monthly_data = [], status_breakdown = {}, user_roles = {}, review_ratings = {} }) {
    const { auth } = usePage().props;
    const time = new Date().getHours();
    const greeting =
        time < 12
            ? "Good Morning"
            : time < 18
              ? "Good Afternoon"
              : "Good Evening";

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
                            {greeting}, <span className="text-primary">{auth.user.name}</span>
                        </h2>
                        <p className="text-muted-foreground mt-1 text-lg">
                            Here's what's happening with your properties today.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route("admin.hotels.create")}>
                            <Button className="shadow-lg hover:shadow-primary/20 transition-all rounded-full px-6">
                                <Plus className="mr-2 h-4 w-4" /> Add Property
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
                    <StatCard
                        title="Revenue"
                        value={`$${Number(stats.total_revenue).toLocaleString()}`}
                        icon={DollarSign}
                        description="Total earnings"
                        trend="up"
                        trendValue="+12.5%"
                        colorClass="bg-emerald-500"
                    />
                    <StatCard
                        title="Properties"
                        value={stats.total_hotels}
                        icon={Hotel}
                        description="Active hotels"
                        trend="up"
                        trendValue="+2"
                        colorClass="bg-blue-500"
                    />
                    <StatCard
                        title="Total Rooms"
                        value={stats.total_rooms}
                        icon={Bed}
                        description="Inventory"
                        trend="up"
                        trendValue="+15"
                        colorClass="bg-indigo-500"
                    />
                    <StatCard
                        title="Bookings"
                        value={stats.total_bookings}
                        icon={CalendarCheck}
                        description="Total reservations"
                        trend="up"
                        trendValue="+24"
                        colorClass="bg-violet-500"
                    />
                    <StatCard
                        title="Pending"
                        value={stats.pending_bookings}
                        icon={Clock}
                        description="Check review"
                        trend="warning"
                        trendValue="Awaiting"
                        colorClass="bg-amber-500"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid gap-6 md:grid-cols-7">
                    {/* Bookings & Revenue Chart */}
                    <Card className="md:col-span-5 border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Booking & Revenue Overview</CardTitle>
                            <CardDescription>Monthly bookings and revenue for the last 12 months.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthly_data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
                                        <YAxis yAxisId="left" className="text-xs" tick={{ fontSize: 12 }} />
                                        <YAxis yAxisId="right" orientation="right" className="text-xs" tick={{ fontSize: 12 }} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="bookings"
                                            name="Bookings"
                                            stroke="#6366f1"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorBookings)"
                                        />
                                        <Area
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="revenue"
                                            name="Revenue"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorRevenue)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Status Breakdown */}
                    <Card className="md:col-span-2 border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl">Booking Status</CardTitle>
                            <CardDescription>Current breakdown by status.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={Object.entries(status_breakdown).map(([name, value]) => ({ name, value }))}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {Object.keys(status_breakdown).map((key) => (
                                                <Cell key={key} fill={STATUS_COLORS[key]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                {Object.entries(status_breakdown).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: STATUS_COLORS[key] }} />
                                        <span className="text-xs capitalize text-muted-foreground">{key}</span>
                                        <span className="text-xs font-bold ml-auto">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Users, Reviews & Hotels Charts */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Users Growth */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-500" />
                                Users
                            </CardTitle>
                            <CardDescription>{stats.total_users} total users</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthly_data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="users" name="New Users" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t">
                                {Object.entries(user_roles).map(([key, value]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: ROLE_COLORS[key] }} />
                                        <span className="text-xs capitalize text-muted-foreground">{key}</span>
                                        <span className="text-xs font-bold">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reviews Distribution */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-yellow-500" />
                                Reviews
                            </CardTitle>
                            <CardDescription>{stats.total_reviews} total reviews</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthly_data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="reviews" name="Reviews" fill="#eab308" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-2 mt-4 pt-3 border-t">
                                {Object.entries(review_ratings).map(([key, value], i) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <span className="text-xs w-14 text-muted-foreground">{key}</span>
                                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${stats.total_reviews > 0 ? (value / stats.total_reviews) * 100 : 0}%`,
                                                    backgroundColor: RATING_COLORS[i],
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold w-6 text-right">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Hotels Growth */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Hotel className="h-5 w-5 text-emerald-500" />
                                Hotels
                            </CardTitle>
                            <CardDescription>{stats.total_hotels} properties</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthly_data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorHotels" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="hotels"
                                            name="New Hotels"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            fillOpacity={1}
                                            fill="url(#colorHotels)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t">
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{stats.total_hotels}</p>
                                    <p className="text-xs text-muted-foreground">Properties</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">{stats.total_rooms}</p>
                                    <p className="text-xs text-muted-foreground">Rooms</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold">
                                        {stats.total_rooms > 0 ? Math.round(stats.total_rooms / stats.total_hotels) : 0}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Avg/Hotel</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-7">
                    {/* Recent Bookings Table */}
                    <Card className="md:col-span-5 border-none shadow-lg bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl">
                                    Recent Reservations
                                </CardTitle>
                                <CardDescription>
                                    Last 5 bookings made across your platform.
                                </CardDescription>
                            </div>
                            <Link href={route("admin.bookings.index")}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary font-semibold hover:bg-primary/5"
                                >
                                    View all{" "}
                                    <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-xl border overflow-hidden bg-white/50 dark:bg-zinc-950/50">
                                <Table>
                                    <TableHeader className="bg-muted/30">
                                        <TableRow>
                                            <TableHead className="font-bold">
                                                Guest
                                            </TableHead>
                                            <TableHead className="font-bold">
                                                Hotel / Room
                                            </TableHead>
                                            <TableHead className="font-bold">
                                                Check In
                                            </TableHead>
                                            <TableHead className="font-bold">
                                                Total
                                            </TableHead>
                                            <TableHead className="font-bold">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-right font-bold pr-6">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recent_bookings.map((booking) => (
                                            <TableRow
                                                key={booking.id}
                                                className="hover:bg-muted/20 transition-colors"
                                            >
                                                <TableCell className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                                            {booking.user.name.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-sm">
                                                                {
                                                                    booking.user
                                                                        .name
                                                                }
                                                            </div>
                                                            <div className="text-[10px] text-muted-foreground">
                                                                {
                                                                    booking.user
                                                                        .email
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm font-semibold">
                                                        {
                                                            booking.room.hotel
                                                                .name
                                                        }
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground">
                                                        Room:{" "}
                                                        {
                                                            booking.room
                                                                .room_number
                                                        }
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {new Date(
                                                        booking.check_in_date,
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                        },
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-bold text-sm text-primary">
                                                    $
                                                    {Number(
                                                        booking.total_price,
                                                    ).toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        booking.status,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right pr-6">
                                                    <Link
                                                        href={route(
                                                            "admin.bookings.show",
                                                            booking.uuid,
                                                        )}
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 rounded-full hover:bg-primary hover:text-white transition-all"
                                                        >
                                                            <ArrowRight className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {recent_bookings.length === 0 && (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="text-center py-12 text-muted-foreground italic"
                                                >
                                                    No recent bookings found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions / Additional Info */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="border-none shadow-lg bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Need help?
                                </CardTitle>
                                <CardDescription className="text-white/80">
                                    Check documentation or contact support.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button
                                    variant="secondary"
                                    className="w-full justify-between group"
                                >
                                    View Guide{" "}
                                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="w-full justify-between group"
                                    onClick={() =>
                                        window.open(
                                            "https://t.me/your_bot",
                                            "_blank",
                                        )
                                    }
                                >
                                    Telegram Support{" "}
                                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    System Health
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground uppercase font-bold tracking-tight">
                                            Occupancy Rate
                                        </span>
                                        <span className="font-bold">78%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[78%] rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground uppercase font-bold tracking-tight">
                                            Payment Target
                                        </span>
                                        <span className="font-bold">92%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[92%] rounded-full" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
