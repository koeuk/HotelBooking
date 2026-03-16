import { useState, useMemo } from "react";
import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft, Hotel, BedDouble, Users, MapPin, Star, Calendar,
    DollarSign, CheckCircle, CreditCard,
} from "lucide-react";
import HotelMap from "@/components/HotelMap";

export default function Create({ hotel }) {
    const roomTypes = hotel.room_types || [];
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        room_id: "",
        check_in_date: "",
        check_out_date: "",
    });

    const nights = useMemo(() => {
        if (!data.check_in_date || !data.check_out_date) return 0;
        const diff = new Date(data.check_out_date) - new Date(data.check_in_date);
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }, [data.check_in_date, data.check_out_date]);

    const pricePerNight = selectedRoomType?.price_per_night || 0;
    const totalPrice = nights * pricePerNight;

    const selectRoom = (roomType, room) => {
        setSelectedRoomType(roomType);
        setSelectedRoom(room);
        setData("room_id", String(room.id));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("bookings.store"));
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <WebLayout>
            <Head title={`Book ${hotel.name}`} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <Button variant="ghost" size="sm" asChild>
                    <Link href={`/explore/${hotel.uuid}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to {hotel.name}
                    </Link>
                </Button>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Book Your Stay</h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {hotel.name} — {hotel.city}, {hotel.country}
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left - Room Selection & Dates */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Step 1: Select Dates */}
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5 text-primary" />
                                        1. Select Dates
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="check_in_date">Check-in Date</Label>
                                            <Input
                                                id="check_in_date"
                                                type="date"
                                                min={today}
                                                value={data.check_in_date}
                                                onChange={(e) => setData("check_in_date", e.target.value)}
                                            />
                                            {errors.check_in_date && (
                                                <p className="text-sm text-destructive">{errors.check_in_date}</p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="check_out_date">Check-out Date</Label>
                                            <Input
                                                id="check_out_date"
                                                type="date"
                                                min={data.check_in_date || today}
                                                value={data.check_out_date}
                                                onChange={(e) => setData("check_out_date", e.target.value)}
                                            />
                                            {errors.check_out_date && (
                                                <p className="text-sm text-destructive">{errors.check_out_date}</p>
                                            )}
                                        </div>
                                    </div>
                                    {nights > 0 && (
                                        <p className="text-sm text-muted-foreground mt-3">
                                            {nights} night{nights !== 1 ? "s" : ""}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Step 2: Select Room */}
                            <Card className="border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BedDouble className="h-5 w-5 text-primary" />
                                        2. Select a Room
                                    </CardTitle>
                                    <CardDescription>{roomTypes.length} room types available</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {roomTypes.map((type) => {
                                        const availableRooms = (type.rooms || []).filter((r) => r.status === "available");
                                        return (
                                            <div key={type.id} className="border rounded-xl p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{type.name}</h3>
                                                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                                            <span className="flex items-center gap-1">
                                                                <Users className="h-3.5 w-3.5" /> {type.max_guests} guests
                                                            </span>
                                                            <span>{availableRooms.length} available</span>
                                                        </div>
                                                        {type.description && (
                                                            <p className="text-sm text-muted-foreground mt-2">{type.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-xl font-bold text-primary">${type.price_per_night}</p>
                                                        <p className="text-xs text-muted-foreground">per night</p>
                                                    </div>
                                                </div>

                                                {availableRooms.length > 0 ? (
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                        {availableRooms.map((room) => (
                                                            <button
                                                                key={room.id}
                                                                type="button"
                                                                onClick={() => selectRoom(type, room)}
                                                                className={`p-3 rounded-lg border text-center text-sm transition-all ${
                                                                    selectedRoom?.id === room.id
                                                                        ? "border-primary bg-primary/5 ring-2 ring-primary"
                                                                        : "border-zinc-200 dark:border-zinc-700 hover:border-primary/50"
                                                                }`}
                                                            >
                                                                <p className="font-medium">Room {room.room_number}</p>
                                                                {room.floor && (
                                                                    <p className="text-xs text-muted-foreground">Floor {room.floor}</p>
                                                                )}
                                                                {selectedRoom?.id === room.id && (
                                                                    <CheckCircle className="h-4 w-4 text-primary mx-auto mt-1" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground text-center py-2">No rooms available</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {errors.room_id && (
                                        <p className="text-sm text-destructive">{errors.room_id}</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Map */}
                            {hotel.latitude && hotel.longitude && (
                                <Card className="border-none shadow-sm overflow-hidden">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-primary" /> Location
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <HotelMap
                                            latitude={hotel.latitude}
                                            longitude={hotel.longitude}
                                            name={hotel.name}
                                            className="h-[250px] w-full"
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Right - Booking Summary */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-sm sticky top-20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                        Booking Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="font-semibold">{hotel.name}</p>
                                        <p className="text-sm text-muted-foreground">{hotel.city}, {hotel.country}</p>
                                    </div>
                                    <Separator />

                                    {selectedRoomType ? (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Room Type</span>
                                                <span className="font-medium">{selectedRoomType.name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Room</span>
                                                <span className="font-medium">#{selectedRoom?.room_number}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-2">Select a room above</p>
                                    )}

                                    {data.check_in_date && data.check_out_date && (
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Check-in</span>
                                                <span className="font-medium">
                                                    {new Date(data.check_in_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Check-out</span>
                                                <span className="font-medium">
                                                    {new Date(data.check_out_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Duration</span>
                                                <span className="font-medium">{nights} night{nights !== 1 ? "s" : ""}</span>
                                            </div>
                                        </div>
                                    )}

                                    <Separator />

                                    {nights > 0 && selectedRoomType && (
                                        <>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    ${pricePerNight} × {nights} night{nights !== 1 ? "s" : ""}
                                                </span>
                                                <span className="font-medium">${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <Separator />
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-lg">Total</span>
                                                <span className="font-bold text-2xl text-primary">${totalPrice.toFixed(2)}</span>
                                            </div>
                                        </>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base rounded-xl"
                                        disabled={processing || !selectedRoom || nights <= 0}
                                    >
                                        {processing ? "Booking..." : "Confirm Booking"}
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        You won't be charged yet. Pay after confirmation.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </WebLayout>
    );
}
