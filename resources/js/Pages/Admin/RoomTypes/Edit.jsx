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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";

export default function Edit({ roomType, hotels }) {
    const { data, setData, patch, processing, errors } = useForm({
        hotel_id: roomType.hotel_id.toString(),
        name: roomType.name || "",
        description: roomType.description || "",
        max_guests: roomType.max_guests || 1,
        price_per_night: roomType.price_per_night || 0,
        images: roomType.images || [],
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.room-types.update", roomType.id), {
            onSuccess: () => toast.success("Room type updated successfully"),
            onError: () => toast.error("Failed to update room type"),
        });
    };

    const addImage = () => {
        const url = prompt("Enter image URL");
        if (url) {
            setData("images", [...data.images, url]);
        }
    };

    const removeImage = (index) => {
        setData(
            "images",
            data.images.filter((_, i) => i !== index),
        );
    };

    return (
        <AdminLayout>
            <Head title={`Edit Room Type - ${roomType.name}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route("admin.room-types.index")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Edit Room Type
                    </h2>
                </div>

                <form onSubmit={submit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Room Type Details</CardTitle>
                            <CardDescription>
                                Update information for{" "}
                                <strong>{roomType.name}</strong>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="hotel_id">Hotel</Label>
                                <Select
                                    defaultValue={data.hotel_id}
                                    onValueChange={(v) =>
                                        setData("hotel_id", v)
                                    }
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
                                <Label htmlFor="name">Room Type Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder="e.g. Deluxe Double Sea View"
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    placeholder="Describe the room features, amenities, etc."
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="max_guests">
                                        Max Guests
                                    </Label>
                                    <Input
                                        id="max_guests"
                                        type="number"
                                        min="1"
                                        value={data.max_guests}
                                        onChange={(e) =>
                                            setData(
                                                "max_guests",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.max_guests && (
                                        <p className="text-sm text-destructive">
                                            {errors.max_guests}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price_per_night">
                                        Price Per Night ($)
                                    </Label>
                                    <Input
                                        id="price_per_night"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price_per_night}
                                        onChange={(e) =>
                                            setData(
                                                "price_per_night",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.price_per_night && (
                                        <p className="text-sm text-destructive">
                                            {errors.price_per_night}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Images</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={addImage}
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add
                                        image URL
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {data.images.map((url, index) => (
                                        <div
                                            key={index}
                                            className="relative group aspect-video"
                                        >
                                            <img
                                                src={url}
                                                alt={`Room ${index + 1}`}
                                                className="w-full h-full object-cover rounded-md border"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                                className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {errors.images && (
                                    <p className="text-sm text-destructive">
                                        {errors.images}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4 border-t px-6 py-4">
                            <Button variant="outline" asChild>
                                <Link href={route("admin.room-types.index")}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? "Saving..." : "Update Room Type"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AdminLayout>
    );
}
