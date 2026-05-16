import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    BedDouble,
    Pencil,
    Users,
    DollarSign,
    ImageIcon,
    Hotel,
    DoorOpen,
} from "lucide-react";

const statusColors = {
    available: "bg-green-100 text-green-800",
    booked: "bg-blue-100 text-blue-800",
    maintenance: "bg-yellow-100 text-yellow-800",
};

export default function Show({ roomType }) {
    return (
        <DashboardLayout>
            <Head title={`Room Type - ${roomType.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route("dashboard.room-types.index")}>
                                <ChevronLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {roomType.name}
                        </h2>
                    </div>

                    <Button asChild>
                        <Link
                            href={route("dashboard.room-types.edit", roomType.uuid)}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Room Type
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {/* Room Type Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BedDouble className="h-5 w-5" /> Room Type
                                    Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-muted-foreground">
                                            Hotel
                                        </Label>
                                        {roomType.hotel ? (
                                            <p className="font-semibold text-lg">
                                                <Link
                                                    href={route(
                                                        "dashboard.hotels.show",
                                                        roomType.hotel.uuid,
                                                    )}
                                                    className="hover:underline"
                                                >
                                                    {roomType.hotel.name}
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
                                            Name
                                        </Label>
                                        <p className="font-semibold text-lg">
                                            {roomType.name}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                {roomType.description && (
                                    <>
                                        <div>
                                            <Label className="text-muted-foreground">
                                                Description
                                            </Label>
                                            <p className="mt-1">
                                                {roomType.description}
                                            </p>
                                        </div>
                                        <Separator />
                                    </>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-md">
                                            <Users className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                                                Max users
                                            </Label>
                                            <p className="font-medium">
                                                {roomType.max_users}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary/10 p-2 rounded-md">
                                            <DollarSign className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                                                Price Per Night
                                            </Label>
                                            <p className="font-medium">
                                                ${roomType.price_per_night}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Images */}
                        {roomType.images && roomType.images.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <ImageIcon className="h-5 w-5" /> Images
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {roomType.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`${roomType.name} - ${index + 1}`}
                                                className="rounded-lg object-cover w-full h-48"
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar - Rooms */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DoorOpen className="h-5 w-5" /> Rooms
                                    <Badge variant="secondary">
                                        {roomType.rooms?.length || 0}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {roomType.rooms && roomType.rooms.length > 0 ? (
                                    <div className="space-y-3">
                                        {roomType.rooms.map((room) => (
                                            <div
                                                key={room.id}
                                                className="flex items-center justify-between p-3 border rounded-lg"
                                            >
                                                <div>
                                                    <Link
                                                        href={route(
                                                            "dashboard.rooms.show",
                                                            room.uuid,
                                                        )}
                                                        className="font-medium hover:underline"
                                                    >
                                                        Room {room.room_number}
                                                    </Link>
                                                    <p className="text-sm text-muted-foreground">
                                                        Floor {room.floor}
                                                    </p>
                                                </div>
                                                <Badge
                                                    className={
                                                        statusColors[
                                                            room.status
                                                        ] || ""
                                                    }
                                                >
                                                    {room.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">
                                        No rooms found.
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
