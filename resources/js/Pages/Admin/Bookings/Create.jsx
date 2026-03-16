import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
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

export default function Create({ users, rooms }) {
    const { data, setData, post, processing, errors } = useForm({
        user_id: "",
        room_id: "",
        check_in_date: "",
        check_out_date: "",
    });

    const selectedRoom = rooms.find((r) => r.id === Number(data.room_id));
    const nights =
        data.check_in_date && data.check_out_date
            ? Math.max(
                  0,
                  Math.ceil(
                      (new Date(data.check_out_date) -
                          new Date(data.check_in_date)) /
                          (1000 * 60 * 60 * 24),
                  ),
              )
            : 0;
    const totalPrice =
        selectedRoom && nights > 0
            ? nights * selectedRoom.room_type.price_per_night
            : 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.bookings.store"));
    };

    return (
        <AdminLayout>
            <Head title="Create Booking" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.bookings.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Create Booking
                    </h2>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="user_id">Guest</Label>
                                <Select
                                    value={data.user_id}
                                    onValueChange={(v) =>
                                        setData("user_id", v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a guest" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {users.map((user) => (
                                            <SelectItem
                                                key={user.id}
                                                value={String(user.id)}
                                            >
                                                {user.name} ({user.email})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.user_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.user_id}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="room_id">Room</Label>
                                <Select
                                    value={data.room_id}
                                    onValueChange={(v) =>
                                        setData("room_id", v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a room" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {rooms.map((room) => (
                                            <SelectItem
                                                key={room.id}
                                                value={String(room.id)}
                                            >
                                                {room.hotel.name} -{" "}
                                                {room.room_type.name} (#{room.room_number}) - $
                                                {room.room_type.price_per_night}
                                                /night
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.room_id && (
                                    <p className="text-sm text-destructive">
                                        {errors.room_id}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="check_in_date">
                                        Check-in Date
                                    </Label>
                                    <Input
                                        id="check_in_date"
                                        type="date"
                                        value={data.check_in_date}
                                        onChange={(e) =>
                                            setData(
                                                "check_in_date",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.check_in_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.check_in_date}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="check_out_date">
                                        Check-out Date
                                    </Label>
                                    <Input
                                        id="check_out_date"
                                        type="date"
                                        value={data.check_out_date}
                                        onChange={(e) =>
                                            setData(
                                                "check_out_date",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.check_out_date && (
                                        <p className="text-sm text-destructive">
                                            {errors.check_out_date}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {totalPrice > 0 && (
                                <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {nights} night{nights > 1 ? "s" : ""} x $
                                            {selectedRoom?.room_type.price_per_night}
                                        </p>
                                    </div>
                                    <p className="text-2xl font-bold text-primary">
                                        ${totalPrice.toFixed(2)}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3 justify-end">
                                <Button
                                    variant="outline"
                                    type="button"
                                    asChild
                                >
                                    <Link href={route("admin.bookings.index")}>
                                        Cancel
                                    </Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    Create Booking
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
