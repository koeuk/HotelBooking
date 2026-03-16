import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    BarChart3,
    CalendarCheck,
    DollarSign,
    Users,
    Star,
    Hotel,
    TrendingUp,
    TrendingDown,
    Ban,
    ArrowDownToLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const periodLabels = {
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
};

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-popover border rounded-lg shadow-lg p-3 text-sm">
            <p className="font-bold mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-muted-foreground">{entry.name}:</span>
                    <span className="font-medium">
                        {entry.name === "Revenue" ? `$${entry.value.toLocaleString()}` : entry.value}
                    </span>
                </p>
            ))}
        </div>
    );
};

const SummaryCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <Card className="border-none shadow-sm">
        <CardContent className="p-4 flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", color)}>
                <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{title}</p>
                {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
            </div>
        </CardContent>
    </Card>
);

export default function Index({ reportData, period, year, availableYears, summary }) {
    const changePeriod = (newPeriod) => {
        router.get(route("admin.reports.index"), { period: newPeriod, year }, { preserveState: true });
    };

    const changeYear = (newYear) => {
        router.get(route("admin.reports.index"), { period, year: newYear }, { preserveState: true });
    };

    return (
        <AdminLayout>
            <Head title="Reports" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <BarChart3 className="h-8 w-8" />
                            Reports
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            {periodLabels[period]} performance overview{period !== "yearly" ? ` for ${year}` : ""}.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Period Selector */}
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
                        {/* Year Selector */}
                        {period !== "yearly" && (
                            <Select value={String(year)} onValueChange={(v) => changeYear(v)}>
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
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SummaryCard title="Total Bookings" value={summary.total_bookings} icon={CalendarCheck} color="bg-indigo-500" />
                    <SummaryCard
                        title="Total Revenue"
                        value={`$${summary.total_revenue.toLocaleString()}`}
                        icon={DollarSign}
                        color="bg-emerald-500"
                        subtitle={`Avg $${summary.avg_booking_value}/booking`}
                    />
                    <SummaryCard title="Total Users" value={summary.total_users} icon={Users} color="bg-blue-500" />
                    <SummaryCard
                        title="Cancellation Rate"
                        value={`${summary.cancellation_rate}%`}
                        icon={Ban}
                        color="bg-rose-500"
                    />
                </div>

                {/* Bookings & Revenue Chart */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle>Bookings & Revenue</CardTitle>
                        <CardDescription>
                            {periodLabels[period]} booking volume and revenue trends.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={reportData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="rBookings" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="rRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
                                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Area yAxisId="left" type="monotone" dataKey="bookings" name="Bookings" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#rBookings)" />
                                    <Area yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#rRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Users, Reviews, Hotels */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-500" /> User Registrations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={reportData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="users" name="Users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Star className="h-5 w-5 text-yellow-500" /> Reviews
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={reportData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="reviews" name="Reviews" fill="#eab308" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Hotel className="h-5 w-5 text-emerald-500" /> Hotels Added
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[220px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={reportData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="rHotels" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area type="monotone" dataKey="hotels" name="Hotels" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#rHotels)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cancellations */}
                <Card className="border-none shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingDown className="h-5 w-5 text-rose-500" /> Cancellations
                        </CardTitle>
                        <CardDescription>Cancelled bookings over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={reportData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444", r: 3 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
