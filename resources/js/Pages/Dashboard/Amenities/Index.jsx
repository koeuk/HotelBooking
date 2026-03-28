import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Eye, Pencil, Trash2, Wifi, Waves, Dumbbell, Sparkles, Utensils, Car, Snowflake, Wine, HelpCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";

const iconMap = {
    wifi: Wifi,
    waves: Waves,
    dumbbell: Dumbbell,
    sparkles: Sparkles,
    utensils: Utensils,
    car: Car,
    snowflake: Snowflake,
    wine: Wine,
};

const AmenityIcon = ({ name, className = "h-5 w-5" }) => {
    const Icon = iconMap[name] || HelpCircle;
    return <Icon className={className} />;
};
import { toast } from "sonner";

export default function Index({ amenities }) {
    const [amenityToDelete, setAmenityToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("dashboard.amenities.destroy", amenityToDelete.uuid), {
            onSuccess: () => {
                setAmenityToDelete(null);
                toast.success("Amenity deleted successfully");
            },
            onError: () => toast.error("Failed to delete amenity"),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Amenities Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Amenities
                        </h2>
                        <p className="text-muted-foreground">
                            Manage amenities available for your properties.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.amenities.create")}>
                            <Plus className="mr-2 h-4 w-4" /> New Amenity
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Hotels Count</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {amenities.data.map((amenity) => (
                                <TableRow key={amenity.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <AmenityIcon name={amenity.icon} className="h-5 w-5 text-primary" />
                                            </div>
                                            {amenity.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{amenity.icon}</TableCell>
                                    <TableCell>
                                        {amenity.hotels_count}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.amenities.show",
                                                    amenity.uuid,
                                                )}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.amenities.edit",
                                                    amenity.uuid,
                                                )}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() =>
                                                setAmenityToDelete(amenity)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {amenities.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No amenities found. Start by adding one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {amenities.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {amenities.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                asChild={!!link.url}
                                disabled={!link.url}
                                className={!link.url ? "opacity-50" : ""}
                            >
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!amenityToDelete}
                onOpenChange={(open) => {
                    if (!open) setAmenityToDelete(null);
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-col items-center text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
                        </div>
                        <DialogTitle className="text-center">
                            Delete Amenity
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            This action cannot be undone. This will permanently
                            delete this amenity and remove it from all
                            associated hotels.
                        </DialogDescription>
                    </DialogHeader>

                    {amenityToDelete && (
                        <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Name</span>
                                <span className="font-medium">{amenityToDelete.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Icon</span>
                                <span className="font-medium flex items-center gap-2">
                                    <AmenityIcon name={amenityToDelete.icon} className="h-4 w-4" />
                                    {amenityToDelete.icon}
                                </span>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setAmenityToDelete(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="flex-1"
                            onClick={handleDelete}
                            disabled={processing}
                        >
                            {processing ? "Deleting..." : "Delete Amenity"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}
