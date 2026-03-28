import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Eye, Edit, Trash2, Search, X, CheckCircle, Clock, Wrench, Bed } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const statusConfig = {
    available: { label: "Available", icon: CheckCircle, class: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" },
    booked: { label: "Booked", icon: Clock, class: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400" },
    maintenance: { label: "Maintenance", icon: Wrench, class: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400" },
};

const getStatusBadge = (status) => {
    const config = statusConfig[status];
    if (!config) return <Badge variant="secondary">{status}</Badge>;
    const Icon = config.icon;
    return (
        <Badge variant="outline" className={cn("font-medium rounded-full", config.class)}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
        </Badge>
    );
};

export default function Index({ rooms, hotels = [], filters = {}, counts = {} }) {
    const [roomToDelete, setRoomToDelete] = useState(null);
    const [search, setSearch] = useState(filters.search || "");
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("dashboard.rooms.destroy", roomToDelete.uuid), {
            onSuccess: () => { setRoomToDelete(null); toast.success("Room deleted successfully"); },
            onError: () => toast.error("Failed to delete room"),
        });
    };

    const applyFilters = (newFilters) => {
        router.get(route("dashboard.rooms.index"), { ...filters, ...newFilters }, { preserveState: true });
    };

    const statusTabs = [
        { label: "All", value: "", count: counts.all },
        { label: "Available", value: "available", count: counts.available, color: "text-emerald-500" },
        { label: "Booked", value: "booked", count: counts.booked, color: "text-blue-500" },
        { label: "Maintenance", value: "maintenance", count: counts.maintenance, color: "text-amber-500" },
    ];

    return (
        <DashboardLayout>
            <Head title="Rooms Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Rooms</h2>
                        <p className="text-muted-foreground">Manage individual rooms, their floors and status.</p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.rooms.create")}>
                            <Plus className="mr-2 h-4 w-4" /> Add Room
                        </Link>
                    </Button>
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-2 flex-wrap">
                    {statusTabs.map((tab) => (
                        <Button
                            key={tab.value}
                            variant={(filters.status || "") === tab.value ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                            onClick={() => applyFilters({ status: tab.value || undefined, page: 1 })}
                        >
                            <span className={cn((filters.status || "") !== tab.value && tab.color)}>
                                {tab.label}
                            </span>
                            <span className={cn(
                                "ml-2 text-xs px-1.5 py-0.5 rounded-full",
                                (filters.status || "") === tab.value
                                    ? "bg-white/20"
                                    : "bg-muted"
                            )}>
                                {tab.count}
                            </span>
                        </Button>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search room number..."
                            className="pl-10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") applyFilters({ search, page: 1 }); }}
                        />
                    </div>
                    <Select
                        value={filters.hotel || "all"}
                        onValueChange={(v) => applyFilters({ hotel: v === "all" ? undefined : v, page: 1 })}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="All Hotels" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Hotels</SelectItem>
                            {hotels.map((h) => (
                                <SelectItem key={h.id} value={String(h.id)}>{h.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {(filters.search || filters.hotel || filters.status) && (
                        <Button variant="ghost" size="sm" onClick={() => { setSearch(""); router.get(route("dashboard.rooms.index")); }}>
                            <X className="mr-1 h-4 w-4" /> Clear
                        </Button>
                    )}
                </div>

                {/* Table */}
                <Card className="border-none shadow-sm">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30">
                                    <TableHead className="font-bold">Room #</TableHead>
                                    <TableHead className="font-bold">Hotel</TableHead>
                                    <TableHead className="font-bold">Type</TableHead>
                                    <TableHead className="font-bold">Floor</TableHead>
                                    <TableHead className="font-bold">Status</TableHead>
                                    <TableHead className="text-right font-bold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rooms.data.map((room) => (
                                    <TableRow key={room.id} className="hover:bg-muted/20 transition-colors">
                                        <TableCell>
                                            <span className="font-bold text-sm bg-muted px-2.5 py-1 rounded-full">
                                                #{room.room_number}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium">{room.hotel.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{room.room_type.name}</TableCell>
                                        <TableCell>
                                            <span className="text-muted-foreground">Floor {room.floor || "-"}</span>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(room.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={route("dashboard.rooms.show", room.uuid)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={route("dashboard.rooms.edit", room.uuid)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setRoomToDelete(room)}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                This will permanently delete room <strong>{room.room_number}</strong> from <strong>{room.hotel.name}</strong>.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button variant="outline" onClick={() => setRoomToDelete(null)}>Cancel</Button>
                                                            <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                                                                {processing ? "Deleting..." : "Delete Room"}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {rooms.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12">
                                            <Bed className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                                            <p className="text-muted-foreground">No rooms found.</p>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {rooms.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {rooms.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                asChild={!!link.url}
                                disabled={!link.url}
                                className={!link.url ? "opacity-50" : ""}
                            >
                                {link.url ? (
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
