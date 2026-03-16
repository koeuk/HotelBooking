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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    ChevronLeft,
    Mail,
    Phone,
    Calendar,
    Edit,
    ShieldCheck,
    User as UserIcon,
    Hotel,
    DollarSign,
} from "lucide-react";

const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
};

export default function Show({ user }) {
    const initials = user.name
        .split(" ")
        .map((n) => n.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <AdminLayout>
            <Head title={`User - ${user.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("admin.users.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            User Details
                        </h2>
                    </div>
                    <Button asChild>
                        <Link href={route("admin.users.edit", user.uuid)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit User
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* User Profile Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center gap-3">
                                <Avatar className="h-20 w-20">
                                    <AvatarFallback className="text-2xl">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 className="text-xl font-bold">
                                    {user.name}
                                </h3>
                                {user.role === "admin" ? (
                                    <Badge className="bg-primary/10 text-primary border-primary/20">
                                        <ShieldCheck className="w-3 h-3 mr-1" />{" "}
                                        Admin
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary">
                                        <UserIcon className="w-3 h-3 mr-1" />{" "}
                                        Guest
                                    </Badge>
                                )}
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        {user.phone || "No phone provided"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        Joined{" "}
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString(undefined, {
                                            dateStyle: "long",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bookings Card */}
                    <div className="md:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Hotel className="h-5 w-5" /> Bookings
                                    <Badge variant="outline" className="ml-2">
                                        {user.bookings?.length || 0}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {user.bookings && user.bookings.length > 0 ? (
                                    <div className="space-y-4">
                                        {user.bookings.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="flex items-center justify-between p-4 border rounded-lg"
                                            >
                                                <div className="space-y-1">
                                                    <p className="font-semibold">
                                                        {booking.room?.hotel
                                                            ?.name ||
                                                            "Unknown Hotel"}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>
                                                            {new Date(
                                                                booking.check_in_date
                                                            ).toLocaleDateString()}{" "}
                                                            -{" "}
                                                            {new Date(
                                                                booking.check_out_date
                                                            ).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1 font-semibold">
                                                            <DollarSign className="h-4 w-4" />
                                                            {booking.total_price}
                                                        </div>
                                                        <Badge
                                                            className={
                                                                statusColors[
                                                                    booking
                                                                        .status
                                                                ] || ""
                                                            }
                                                        >
                                                            {booking.status}
                                                        </Badge>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={route(
                                                                "admin.bookings.show",
                                                                booking.uuid
                                                            )}
                                                        >
                                                            View
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-center py-8">
                                        No bookings found for this user.
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
