import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

import { useMemo } from "react";

export default function Create({ hotels, roomTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        hotel_id: "",
        room_type_id: "",
        room_number: "",
        floor: "",
        status: "available",
    });

    const filteredRoomTypes = useMemo(() => {
        if (!data.hotel_id) return [];
        return roomTypes.filter(
            (type) => type.hotel_id.toString() === data.hotel_id,
        );
    }, [data.hotel_id, roomTypes]);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.rooms.store"));
    };

    return (
        <AdminLayout>
            <Head title="Add Room" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.rooms.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Add Room
                    </h2>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Room Details</CardTitle>
                            <CardDescription>
                                Registry a specific room in a hotel.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hotel_id">Hotel</Label>
                                    <Select
                                        onValueChange={(v) => {
                                            setData((d) => ({
                                                ...d,
                                                hotel_id: v,
                                                room_type_id: "",
                                            }));
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a hotel" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hotels.map((hotel) => (
                                                <SelectItem
                                                    key={hotel.id}
                                                    value={hotel.id.toString()}
                                                >
                                                    {hotel.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.hotel_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.hotel_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="room_type_id">
                                        Room Type
                                    </Label>
                                    <Select
                                        disabled={!data.hotel_id}
                                        value={data.room_type_id}
                                        onValueChange={(v) =>
                                            setData("room_type_id", v)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    data.hotel_id
                                                        ? "Select a type"
                                                        : "Select hotel first"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredRoomTypes.map((type) => (
                                                <SelectItem
                                                    key={type.id}
                                                    value={type.id.toString()}
                                                >
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.room_type_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.room_type_id}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="room_number">
                                        Room Number
                                    </Label>
                                    <Input
                                        id="room_number"
                                        value={data.room_number}
                                        onChange={(e) =>
                                            setData(
                                                "room_number",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. 101, A-12"
                                    />
                                    {errors.room_number && (
                                        <p className="text-sm text-destructive">
                                            {errors.room_number}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="floor">Floor</Label>
                                    <Input
                                        id="floor"
                                        type="number"
                                        value={data.floor}
                                        onChange={(e) =>
                                            setData("floor", e.target.value)
                                        }
                                        placeholder="e.g. 1, 2"
                                    />
                                    {errors.floor && (
                                        <p className="text-sm text-destructive">
                                            {errors.floor}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Initial Status</Label>
                                <Select
                                    value={data.status}
                                    onValueChange={(v) => setData("status", v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="available">
                                            Available
                                        </SelectItem>
                                        <SelectItem value="booked">
                                            Booked
                                        </SelectItem>
                                        <SelectItem value="maintenance">
                                            Maintenance
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-destructive">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                            <Button variant="outline" asChild>
                                <Link href={route("admin.rooms.index")}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Create Room"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
