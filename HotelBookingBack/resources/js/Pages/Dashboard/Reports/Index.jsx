import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BarChart3,
    CalendarCheck,
    DollarSign,
    Users,
    Star,
    Hotel,
    TrendingDown,
    Ban,
    CreditCard,
    Download,
    FileText,
    FileSpreadsheet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { exportPDF, exportExcel } from "@/lib/exportUtils";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const periodLabels = { weekly: "Weekly", monthly: "Monthly", yearly: "Yearly" };

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-popover border rounded-lg shadow-lg p-3 text-sm">
            <p className="font-bold mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} className="flex items-center gap-2">
                    <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-muted-foreground">{entry.name}:</span>
                    <span className="font-medium">
                        {entry.name === "Revenue"
                            ? `$${entry.value.toLocaleString()}`
                            : entry.value}
                    </span>
                </p>
            ))}
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        pending:
            "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
        confirmed:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
        completed:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
        cancelled:
            "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
        paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
    };
    return (
        <Badge
            variant="outline"
            className={cn("text-[10px] capitalize", styles[status])}
        >
            {status}
        </Badge>
    );
};

const SummaryCard = ({ title, value, icon: Icon, color }) => (
    <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", color)}>
                <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{title}</p>
            </div>
        </CardContent>
    </Card>
);

const ExportButton = ({ onPDF, onExcel }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" onClick={onPDF}>
                    <FileText className="h-4 w-4" /> PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={onExcel}>
                    <FileSpreadsheet className="h-4 w-4" /> Excel
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
);

const BOOKING_STATUS_COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444"];
const PAYMENT_STATUS_COLORS = ["#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];
const PAYMENT_METHOD_COLORS = ["#6366f1", "#10b981", "#3b82f6"];

const DonutChart = ({ data, colors, title }) => {
    const total = data.reduce((s, d) => s + d.value, 0);
    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.filter((d) => d.value > 0)}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {data.map((_, i) => (
                                    <Cell key={i} fill={colors[i]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [
                                    `${value} (${total > 0 ? ((value / total) * 100).toFixed(1) : 0}%)`,
                                    name,
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                    {data.map((item, i) => (
                        <div
                            key={item.name}
                            className="flex items-center gap-2"
                        >
                            <span
                                className="h-3 w-3 rounded-full shrink-0"
                                style={{ backgroundColor: colors[i] }}
                            />
                            <span className="text-xs text-muted-foreground truncate">
                                {item.name}
                            </span>
                            <span className="text-xs font-bold ml-auto">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default function Index({
    reportData,
    period,
    year,
    availableYears,
    summary,
    top_hotels,
    recent_bookings,
    recent_users,
    recent_reviews,
    top_payments,
    booking_statuses = [],
    payment_statuses = [],
    payment_methods = [],
}) {
    const changePeriod = (p) =>
        router.get(
            route("dashboard.reports.index"),
            { period: p, year },
            { preserveState: true },
        );
    const changeYear = (y) =>
        router.get(
            route("dashboard.reports.index"),
            { period, year: y },
            { preserveState: true },
        );
    const sub = `${periodLabels[period]} Report${period !== "yearly" ? ` — ${year}` : ""}`;

    // ── Export Handlers ──

    const exportChartData = (format) => {
        const cols = [
            "Period",
            "Bookings",
            "Revenue ($)",
            "Users",
            "Reviews",
            "Hotels",
            "Cancelled",
        ];
        const rows = reportData.map((d) => [
            d.label,
            d.bookings,
            d.revenue,
            d.users,
            d.reviews,
            d.hotels,
            d.cancelled,
        ]);
        if (format === "pdf")
            exportPDF(
                "Overview Report",
                cols,
                rows,
                `overview-report-${period}`,
                { subtitle: sub, landscape: true },
            );
        else exportExcel("Overview", cols, rows, `overview-report-${period}`);
    };

    const exportBookings = (format) => {
        const cols = [
            "user",
            "Email",
            "Hotel",
            "Room",
            "Check In",
            "Check Out",
            "Total ($)",
            "Status",
        ];
        const rows = recent_bookings.map((b) => [
            b.user?.name,
            b.user?.email,
            b.room?.hotel?.name,
            b.room?.room_type?.name || b.room?.room_number,
            b.check_in_date,
            b.check_out_date,
            b.total_price,
            b.status,
        ]);
        if (format === "pdf")
            exportPDF("Bookings Report", cols, rows, "bookings-report", {
                subtitle: sub,
                landscape: true,
            });
        else exportExcel("Bookings", cols, rows, "bookings-report");
    };

    const exportHotels = (format) => {
        const cols = [
            "Hotel",
            "City",
            "Country",
            "Rooms",
            "Reviews",
            "Avg Rating",
        ];
        const rows = top_hotels.map((h) => [
            h.name,
            h.city,
            h.country,
            h.rooms_count,
            h.reviews_count,
            h.reviews_avg_rating
                ? Number(h.reviews_avg_rating).toFixed(1)
                : "—",
        ]);
        if (format === "pdf")
            exportPDF("Hotels Report", cols, rows, "hotels-report", {
                subtitle: sub,
            });
        else exportExcel("Hotels", cols, rows, "hotels-report");
    };

    const exportUsers = (format) => {
        const cols = ["Name", "Email", "Role", "Bookings", "Joined"];
        const rows = recent_users.map((u) => [
            u.name,
            u.email,
            u.role,
            u.bookings_count,
            new Date(u.created_at).toLocaleDateString(),
        ]);
        if (format === "pdf")
            exportPDF("Users Report", cols, rows, "users-report", {
                subtitle: sub,
            });
        else exportExcel("Users", cols, rows, "users-report");
    };

    const exportReviews = (format) => {
        const cols = ["Hotel", "user", "Rating", "Comment", "Date"];
        const rows = recent_reviews.map((r) => [
            r.hotel?.name,
            r.user?.name,
            `${r.rating}/5`,
            r.comment ? r.comment.substring(0, 80) : "—",
            new Date(r.created_at).toLocaleDateString(),
        ]);
        if (format === "pdf")
            exportPDF("Reviews Report", cols, rows, "reviews-report", {
                subtitle: sub,
            });
        else exportExcel("Reviews", cols, rows, "reviews-report");
    };

    const exportPayments = (format) => {
        const cols = [
            "Transaction ID",
            "user",
            "Hotel",
            "Amount ($)",
            "Method",
            "Status",
            "Paid At",
        ];
        const rows = top_payments.map((p) => [
            p.transaction_id || "—",
            p.booking?.user?.name,
            p.booking?.room?.hotel?.name,
            p.amount,
            p.method,
            p.status,
            p.paid_at || "—",
        ]);
        if (format === "pdf")
            exportPDF("Payments Report", cols, rows, "payments-report", {
                subtitle: sub,
                landscape: true,
            });
        else exportExcel("Payments", cols, rows, "payments-report");
    };

    const exportAll = (format) => {
        if (format === "excel") {
            // Multi-sheet Excel
            const XLSX = require("xlsx");
            const wb = XLSX.utils.book_new();

            const addSheet = (name, cols, rows) => {
                const ws = XLSX.utils.aoa_to_sheet([cols, ...rows]);
                XLSX.utils.book_append_sheet(wb, ws, name.substring(0, 31));
            };

            addSheet(
                "Overview",
                [
                    "Period",
                    "Bookings",
                    "Revenue",
                    "Users",
                    "Reviews",
                    "Hotels",
                    "Cancelled",
                ],
                reportData.map((d) => [
                    d.label,
                    d.bookings,
                    d.revenue,
                    d.users,
                    d.reviews,
                    d.hotels,
                    d.cancelled,
                ]),
            );
            addSheet(
                "Bookings",
                ["user", "Email", "Hotel", "Total", "Status"],
                recent_bookings.map((b) => [
                    b.user?.name,
                    b.user?.email,
                    b.room?.hotel?.name,
                    b.total_price,
                    b.status,
                ]),
            );
            addSheet(
                "Hotels",
                ["Hotel", "City", "Country", "Rooms", "Reviews", "Rating"],
                top_hotels.map((h) => [
                    h.name,
                    h.city,
                    h.country,
                    h.rooms_count,
                    h.reviews_count,
                    h.reviews_avg_rating
                        ? Number(h.reviews_avg_rating).toFixed(1)
                        : "—",
                ]),
            );
            addSheet(
                "Users",
                ["Name", "Email", "Role", "Bookings"],
                recent_users.map((u) => [
                    u.name,
                    u.email,
                    u.role,
                    u.bookings_count,
                ]),
            );
            addSheet(
                "Reviews",
                ["Hotel", "user", "Rating", "Date"],
                recent_reviews.map((r) => [
                    r.hotel?.name,
                    r.user?.name,
                    r.rating,
                    new Date(r.created_at).toLocaleDateString(),
                ]),
            );
            addSheet(
                "Payments",
                ["Transaction", "user", "Hotel", "Amount", "Method", "Status"],
                top_payments.map((p) => [
                    p.transaction_id,
                    p.booking?.user?.name,
                    p.booking?.room?.hotel?.name,
                    p.amount,
                    p.method,
                    p.status,
                ]),
            );

            const { saveAs } = require("file-saver");
            const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(
                new Blob([buf], { type: "application/octet-stream" }),
                `full-report-${period}-${year}.xlsx`,
            );
        } else {
            exportChartData("pdf");
        }
    };

    return (
        <DashboardLayout>
            <Head title="Reports" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <BarChart3 className="h-8 w-8" /> Reports
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            Complete analytics
                            {period !== "yearly" ? ` for ${year}` : ""} —{" "}
                            {period} view.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-muted rounded-lg p-1">
                            {["weekly", "monthly", "yearly"].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => changePeriod(p)}
                                    className={cn(
                                        "px-3 py-1.5 text-sm font-medium rounded-md transition-all capitalize",
                                        period === p
                                            ? "bg-background shadow-sm text-foreground"
                                            : "text-muted-foreground hover:text-foreground",
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                        {period !== "yearly" && (
                            <Select
                                value={String(year)}
                                onValueChange={changeYear}
                            >
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableYears.map((y) => (
                                        <SelectItem key={y} value={String(y)}>
                                            {y}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                        {/* Export All */}
                        <ExportButton
                            onPDF={() => exportAll("pdf")}
                            onExcel={() => exportAll("excel")}
                        />
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SummaryCard
                        title="Total Bookings"
                        value={summary.total_bookings}
                        icon={CalendarCheck}
                        color="bg-indigo-500"
                    />
                    <SummaryCard
                        title="Revenue"
                        value={`$${summary.total_revenue.toLocaleString()}`}
                        icon={DollarSign}
                        color="bg-emerald-500"
                    />
                    <SummaryCard
                        title="Users"
                        value={summary.total_users}
                        icon={Users}
                        color="bg-blue-500"
                    />
                    <SummaryCard
                        title="Cancel Rate"
                        value={`${summary.cancellation_rate}%`}
                        icon={Ban}
                        color="bg-rose-500"
                    />
                </div>

                {/* ── Bookings & Revenue ── */}
                <div className="grid gap-6 md:grid-cols-7">
                    <Card className="md:col-span-4 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Bookings & Revenue</CardTitle>
                            <ExportButton
                                onPDF={() => exportChartData("pdf")}
                                onExcel={() => exportChartData("excel")}
                            />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={reportData}
                                        margin={{
                                            top: 5,
                                            right: 10,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="rb"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#6366f1"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#6366f1"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                            <linearGradient
                                                id="rr"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="label"
                                            tick={{ fontSize: 11 }}
                                        />
                                        <YAxis
                                            yAxisId="l"
                                            tick={{ fontSize: 11 }}
                                        />
                                        <YAxis
                                            yAxisId="r"
                                            orientation="right"
                                            tick={{ fontSize: 11 }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Area
                                            yAxisId="l"
                                            type="monotone"
                                            dataKey="bookings"
                                            name="Bookings"
                                            stroke="#6366f1"
                                            strokeWidth={2}
                                            fill="url(#rb)"
                                        />
                                        <Area
                                            yAxisId="r"
                                            type="monotone"
                                            dataKey="revenue"
                                            name="Revenue"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            fill="url(#rr)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">
                                Recent Bookings
                            </CardTitle>
                            <ExportButton
                                onPDF={() => exportBookings("pdf")}
                                onExcel={() => exportBookings("excel")}
                            />
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>user</TableHead>
                                        <TableHead>Hotel</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recent_bookings.map((b) => (
                                        <TableRow key={b.id}>
                                            <TableCell className="py-2">
                                                <div className="text-sm font-medium">
                                                    {b.user?.name}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">
                                                    {b.user?.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                {b.room?.hotel?.name}
                                            </TableCell>
                                            <TableCell className="text-sm font-bold text-primary">
                                                ${b.total_price}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge
                                                    status={b.status}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Hotels ── */}
                <div className="grid gap-6 md:grid-cols-7">
                    <Card className="md:col-span-4 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Hotel className="h-5 w-5 text-emerald-500" />{" "}
                                Hotels Growth
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={reportData}
                                        margin={{
                                            top: 5,
                                            right: 10,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <defs>
                                            <linearGradient
                                                id="rh"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >
                                                <stop
                                                    offset="5%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0.3}
                                                />
                                                <stop
                                                    offset="95%"
                                                    stopColor="#10b981"
                                                    stopOpacity={0}
                                                />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="label"
                                            tick={{ fontSize: 11 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11 }}
                                            allowDecimals={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="hotels"
                                            name="Hotels"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            fill="url(#rh)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg">
                                Top Rated Hotels
                            </CardTitle>
                            <ExportButton
                                onPDF={() => exportHotels("pdf")}
                                onExcel={() => exportHotels("excel")}
                            />
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Hotel</TableHead>
                                        <TableHead>Rooms</TableHead>
                                        <TableHead>Reviews</TableHead>
                                        <TableHead>Rating</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {top_hotels.map((h) => (
                                        <TableRow key={h.id}>
                                            <TableCell className="py-2">
                                                <div className="text-sm font-medium">
                                                    {h.name}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground">
                                                    {h.city}, {h.country}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {h.rooms_count}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {h.reviews_count}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className="font-bold"
                                                >
                                                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                                    {h.reviews_avg_rating
                                                        ? Number(
                                                              h.reviews_avg_rating,
                                                          ).toFixed(1)
                                                        : "—"}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Users & Reviews ── */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-500" /> User
                                Registrations
                            </CardTitle>
                            <ExportButton
                                onPDF={() => exportUsers("pdf")}
                                onExcel={() => exportUsers("excel")}
                            />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={reportData}
                                        margin={{
                                            top: 0,
                                            right: 0,
                                            left: -20,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="label"
                                            tick={{ fontSize: 10 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 10 }}
                                            allowDecimals={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="users"
                                            name="Users"
                                            fill="#3b82f6"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-sm font-semibold mb-3">
                                    Latest Users
                                </p>
                                <div className="space-y-3">
                                    {recent_users.slice(0, 5).map((u) => (
                                        <div
                                            key={u.id}
                                            className="flex items-center gap-3"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={u.avatar} />
                                                <AvatarFallback className="text-xs">
                                                    {u.name?.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {u.name}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground truncate">
                                                    {u.email}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="text-[10px] capitalize"
                                            >
                                                {u.role}
                                            </Badge>
                                            <span className="text-[10px] text-muted-foreground">
                                                {u.bookings_count} bookings
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-yellow-500" />{" "}
                                Reviews
                            </CardTitle>
                            <ExportButton
                                onPDF={() => exportReviews("pdf")}
                                onExcel={() => exportReviews("excel")}
                            />
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={reportData}
                                        margin={{
                                            top: 0,
                                            right: 0,
                                            left: -20,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="label"
                                            tick={{ fontSize: 10 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 10 }}
                                            allowDecimals={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="reviews"
                                            name="Reviews"
                                            fill="#eab308"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <p className="text-sm font-semibold mb-3">
                                    Latest Reviews
                                </p>
                                <div className="space-y-3">
                                    {recent_reviews.slice(0, 5).map((r) => (
                                        <div
                                            key={r.id}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <Star
                                                        key={s}
                                                        className={cn(
                                                            "h-3 w-3",
                                                            s <= r.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-muted",
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {r.hotel?.name}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground truncate">
                                                    by {r.user?.name}
                                                </p>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground">
                                                {new Date(
                                                    r.created_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Status & Method Breakdown ── */}
                <div className="grid gap-6 md:grid-cols-3">
                    <DonutChart
                        data={booking_statuses}
                        colors={BOOKING_STATUS_COLORS}
                        title="Booking Status"
                    />
                    <DonutChart
                        data={payment_statuses}
                        colors={PAYMENT_STATUS_COLORS}
                        title="Payment Status"
                    />
                    <DonutChart
                        data={payment_methods}
                        colors={PAYMENT_METHOD_COLORS}
                        title="Payment Methods"
                    />
                </div>

                {/* ── Payments & Cancellations ── */}
                <div className="grid gap-6 md:grid-cols-7">
                    <Card className="md:col-span-4 border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingDown className="h-5 w-5 text-rose-500" />{" "}
                                Cancellations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={reportData}
                                        margin={{
                                            top: 5,
                                            right: 10,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            className="stroke-muted"
                                        />
                                        <XAxis
                                            dataKey="label"
                                            tick={{ fontSize: 11 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 11 }}
                                            allowDecimals={false}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="cancelled"
                                            name="Cancelled"
                                            stroke="#ef4444"
                                            strokeWidth={2}
                                            dot={{ fill: "#ef4444", r: 3 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3 border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-emerald-500" />{" "}
                                Top Payments
                            </CardTitle>
                            <ExportButton
                                onPDF={() => exportPayments("pdf")}
                                onExcel={() => exportPayments("excel")}
                            />
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>user</TableHead>
                                        <TableHead>Hotel</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {top_payments.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="py-2">
                                                <div className="text-sm font-medium">
                                                    {p.booking?.user?.name}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                {p.booking?.room?.hotel?.name}
                                            </TableCell>
                                            <TableCell className="text-sm font-bold text-emerald-600">
                                                ${p.amount}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge
                                                    status={p.status}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
