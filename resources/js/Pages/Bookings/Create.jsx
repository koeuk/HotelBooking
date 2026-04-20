import { useState, useMemo } from "react";
import WebLayout from "@/Layouts/WebLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    BedDouble,
    Users,
    MapPin,
    Star,
    Calendar,
    CheckCircle2,
    CreditCard,
    Sparkles,
} from "lucide-react";
import HotelMap from "@/components/HotelMap";
import { cn } from "@/lib/utils";

function Stepper({ step }) {
    const steps = [
        { id: 1, label: "Dates", icon: Calendar },
        { id: 2, label: "Room", icon: BedDouble },
        { id: 3, label: "Confirm", icon: CheckCircle2 },
    ];
    return (
        <div className="flex items-center gap-2 sm:gap-3">
            {steps.map((s, i) => {
                const Icon = s.icon;
                const active = step >= s.id;
                const current = step === s.id;
                return (
                    <div key={s.id} className="flex items-center gap-2 sm:gap-3">
                        <div
                            className={cn(
                                "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-out-expo",
                                active
                                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                                    : "bg-muted text-muted-foreground",
                                current && "scale-105",
                            )}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            <span>{s.label}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div
                                className={cn(
                                    "h-px w-6 sm:w-10 transition-colors duration-300",
                                    step > s.id
                                        ? "bg-primary/60"
                                        : "bg-border",
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function Create({ hotel }) {
    const roomTypes = hotel.room_types || [];
    const heroImage = hotel.images?.[0] || null;

    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        room_id: "",
        check_in_date: "",
        check_out_date: "",
    });

    const nights = useMemo(() => {
        if (!data.check_in_date || !data.check_out_date) return 0;
        const diff =
            new Date(data.check_out_date) - new Date(data.check_in_date);
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }, [data.check_in_date, data.check_out_date]);

    const pricePerNight = selectedRoomType?.price_per_night || 0;
    const totalPrice = nights * pricePerNight;

    const datesValid = nights > 0;
    const step = !datesValid ? 1 : !selectedRoom ? 2 : 3;

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

            {/* Hero */}
            <div className="relative overflow-hidden">
                {heroImage ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center scale-110 blur-sm"
                        style={{ backgroundImage: `url(${heroImage})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-mesh" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-6">
                    <Button variant="ghost" size="sm" asChild className="w-fit">
                        <Link href={`/explore/${hotel.uuid}`}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to{" "}
                            {hotel.name}
                        </Link>
                    </Button>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-2 animate-fade-up">
                            <Badge
                                variant="outline"
                                className="glass border-foreground/10 text-foreground/80"
                            >
                                <Sparkles className="h-3 w-3" />
                                Reserve your stay
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                Book{" "}
                                <span className="text-gradient-primary">
                                    {hotel.name}
                                </span>
                            </h1>
                            <p className="text-muted-foreground flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                {hotel.city}, {hotel.country}
                                {hotel.rating > 0 && (
                                    <>
                                        <span className="mx-1">•</span>
                                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        <span className="font-medium text-foreground">
                                            {hotel.rating}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                        <div className="animate-fade-up [animation-delay:100ms]">
                            <Stepper step={step} />
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-32 lg:pb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left - Steps */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Step 1: Dates */}
                            <Card
                                variant="elevated"
                                className="animate-fade-up"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                                            1
                                        </span>
                                        Select your dates
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="check_in_date"
                                                className="text-xs uppercase tracking-wide text-muted-foreground"
                                            >
                                                Check-in
                                            </Label>
                                            <Input
                                                id="check_in_date"
                                                type="date"
                                                variant="soft"
                                                min={today}
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
                                            <Label
                                                htmlFor="check_out_date"
                                                className="text-xs uppercase tracking-wide text-muted-foreground"
                                            >
                                                Check-out
                                            </Label>
                                            <Input
                                                id="check_out_date"
                                                type="date"
                                                variant="soft"
                                                min={
                                                    data.check_in_date || today
                                                }
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
                                    {datesValid && (
                                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium animate-scale-in">
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                            {nights} night
                                            {nights !== 1 ? "s" : ""} selected
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Step 2: Rooms */}
                            <Card
                                variant="elevated"
                                className="animate-fade-up [animation-delay:80ms]"
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold">
                                            2
                                        </span>
                                        Choose a room
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {roomTypes.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center py-6">
                                            No rooms available right now.
                                        </p>
                                    )}
                                    {roomTypes.map((type) => {
                                        const availableRooms = (
                                            type.rooms || []
                                        ).filter(
                                            (r) => r.status === "available",
                                        );
                                        return (
                                            <div
                                                key={type.id}
                                                className="rounded-2xl border border-border/60 bg-muted/20 p-4 space-y-4 transition-all duration-300 ease-out-expo hover:border-primary/30"
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="space-y-1">
                                                        <h3 className="font-semibold text-lg leading-tight">
                                                            {type.name}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5">
                                                                <Users className="h-3 w-3" />
                                                                {type.max_users}{" "}
                                                                guests
                                                            </span>
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-background px-2 py-0.5">
                                                                <BedDouble className="h-3 w-3" />
                                                                {
                                                                    availableRooms.length
                                                                }{" "}
                                                                available
                                                            </span>
                                                        </div>
                                                        {type.description && (
                                                            <p className="text-sm text-muted-foreground pt-1">
                                                                {
                                                                    type.description
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <p className="text-2xl font-bold text-gradient-primary leading-none">
                                                            $
                                                            {
                                                                type.price_per_night
                                                            }
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            / night
                                                        </p>
                                                    </div>
                                                </div>

                                                {availableRooms.length > 0 ? (
                                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                                        {availableRooms.map(
                                                            (room) => {
                                                                const selected =
                                                                    selectedRoom?.id ===
                                                                    room.id;
                                                                return (
                                                                    <button
                                                                        key={
                                                                            room.id
                                                                        }
                                                                        type="button"
                                                                        onClick={() =>
                                                                            selectRoom(
                                                                                type,
                                                                                room,
                                                                            )
                                                                        }
                                                                        className={cn(
                                                                            "group relative p-3 rounded-xl border text-center text-sm transition-all duration-300 ease-out-expo overflow-hidden",
                                                                            selected
                                                                                ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow scale-[1.02]"
                                                                                : "border-border bg-background hover:border-primary/40 hover:-translate-y-0.5",
                                                                        )}
                                                                    >
                                                                        <p
                                                                            className={cn(
                                                                                "font-semibold",
                                                                                selected
                                                                                    ? "text-primary-foreground"
                                                                                    : "",
                                                                            )}
                                                                        >
                                                                            #
                                                                            {
                                                                                room.room_number
                                                                            }
                                                                        </p>
                                                                        {room.floor && (
                                                                            <p
                                                                                className={cn(
                                                                                    "text-[10px] mt-0.5",
                                                                                    selected
                                                                                        ? "text-primary-foreground/80"
                                                                                        : "text-muted-foreground",
                                                                                )}
                                                                            >
                                                                                Floor{" "}
                                                                                {
                                                                                    room.floor
                                                                                }
                                                                            </p>
                                                                        )}
                                                                        {selected && (
                                                                            <CheckCircle2 className="absolute top-1 right-1 h-3.5 w-3.5 animate-scale-in" />
                                                                        )}
                                                                    </button>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground text-center py-2">
                                                        Sold out for these dates
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {errors.room_id && (
                                        <p className="text-sm text-destructive">
                                            {errors.room_id}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Map */}
                            {hotel.latitude && hotel.longitude && (
                                <Card
                                    variant="elevated"
                                    className="animate-fade-up [animation-delay:160ms] overflow-hidden"
                                >
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-base">
                                            <MapPin className="h-4 w-4 text-primary" />
                                            Location
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <HotelMap
                                            latitude={hotel.latitude}
                                            longitude={hotel.longitude}
                                            name={hotel.name}
                                            className="h-[280px] w-full"
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Right - Sticky Summary (desktop) */}
                        <div className="hidden lg:block">
                            <BookingSummary
                                hotel={hotel}
                                selectedRoomType={selectedRoomType}
                                selectedRoom={selectedRoom}
                                checkIn={data.check_in_date}
                                checkOut={data.check_out_date}
                                nights={nights}
                                pricePerNight={pricePerNight}
                                totalPrice={totalPrice}
                                processing={processing}
                                canSubmit={!!selectedRoom && nights > 0}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile sticky bottom bar */}
                <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-strong border-t border-border/40 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            {selectedRoom && nights > 0 ? (
                                <>
                                    <p className="text-xs text-muted-foreground">
                                        Total · {nights} night
                                        {nights !== 1 ? "s" : ""}
                                    </p>
                                    <p className="text-xl font-bold text-gradient-primary">
                                        ${totalPrice.toFixed(2)}
                                    </p>
                                </>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Pick dates & room to continue
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            variant="gradient"
                            size="xl"
                            shape="pill"
                            disabled={
                                processing || !selectedRoom || nights <= 0
                            }
                        >
                            {processing ? "Booking…" : "Confirm"}
                        </Button>
                    </div>
                </div>
            </form>
        </WebLayout>
    );
}

function BookingSummary({
    hotel,
    selectedRoomType,
    selectedRoom,
    checkIn,
    checkOut,
    nights,
    pricePerNight,
    totalPrice,
    processing,
    canSubmit,
}) {
    return (
        <Card variant="glass" className="sticky top-24 animate-fade-up">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                    <CreditCard className="h-4 w-4 text-primary" />
                    Booking summary
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <p className="font-semibold">{hotel.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {hotel.city}, {hotel.country}
                    </p>
                </div>

                <Separator />

                {selectedRoomType ? (
                    <div className="space-y-2 text-sm animate-fade-up">
                        <Row label="Room type" value={selectedRoomType.name} />
                        <Row
                            label="Room"
                            value={`#${selectedRoom?.room_number}`}
                        />
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-2">
                        Select a room above
                    </p>
                )}

                {checkIn && checkOut && (
                    <div className="space-y-2 text-sm animate-fade-up">
                        <Row
                            label="Check-in"
                            value={new Date(checkIn).toLocaleDateString(
                                undefined,
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                },
                            )}
                        />
                        <Row
                            label="Check-out"
                            value={new Date(checkOut).toLocaleDateString(
                                undefined,
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                },
                            )}
                        />
                        <Row
                            label="Duration"
                            value={`${nights} night${nights !== 1 ? "s" : ""}`}
                        />
                    </div>
                )}

                {nights > 0 && selectedRoomType && (
                    <>
                        <Separator />
                        <Row
                            label={`$${pricePerNight} × ${nights} night${nights !== 1 ? "s" : ""}`}
                            value={`$${totalPrice.toFixed(2)}`}
                        />
                        <div className="rounded-2xl bg-gradient-primary-soft p-4 flex items-center justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="text-2xl font-bold text-gradient-primary">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                    </>
                )}

                <Button
                    type="submit"
                    variant="gradient"
                    size="xl"
                    shape="pill"
                    className="w-full"
                    disabled={processing || !canSubmit}
                >
                    {processing ? "Booking…" : "Confirm Booking"}
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                    You won't be charged yet. Pay after confirmation.
                </p>
            </CardContent>
        </Card>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-right">{value}</span>
        </div>
    );
}
