import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, CheckCheck, Calendar, Hotel } from "lucide-react";
import { cn } from "@/lib/utils";

function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

export default function Index({ notifications }) {
    const unreadCount = notifications.data.filter((n) => !n.read_at).length;

    const markAsRead = (id) => {
        router.patch(route("dashboard.notifications.read", id), {}, { preserveScroll: true });
    };

    const markAllAsRead = () => {
        router.patch(route("dashboard.notifications.readAll"), {}, { preserveScroll: true });
    };

    return (
        <DashboardLayout>
            <Head title="Notifications" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                        <p className="text-muted-foreground mt-1">
                            {unreadCount > 0
                                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                                : "All caught up!"}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="outline" size="sm" onClick={markAllAsRead}>
                            <CheckCheck className="mr-2 h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                <Card className="border-none shadow-sm">
                    <CardContent className="p-0">
                        {notifications.data.length > 0 ? (
                            <div className="divide-y">
                                {notifications.data.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={cn(
                                            "flex items-start gap-4 p-5 transition-colors",
                                            !notification.read_at && "bg-primary/5"
                                        )}
                                    >
                                        <div className={cn(
                                            "flex items-center justify-center h-10 w-10 rounded-full shrink-0",
                                            !notification.read_at
                                                ? "bg-primary/10 text-primary"
                                                : "bg-muted text-muted-foreground"
                                        )}>
                                            <Hotel className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-sm">
                                                    {notification.data?.title || notification.data?.hotel_name || "Notification"}
                                                </p>
                                                {!notification.read_at && (
                                                    <Badge variant="default" className="text-[10px] px-1.5 py-0">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                                                {notification.data?.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {timeAgo(notification.created_at)}
                                            </p>
                                        </div>
                                        {!notification.read_at && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="shrink-0 text-xs"
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <Check className="mr-1 h-3.5 w-3.5" />
                                                Read
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <Bell className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                <h3 className="text-lg font-semibold">No notifications</h3>
                                <p className="text-muted-foreground text-sm mt-1">
                                    You'll be notified when there are new bookings or updates.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {notifications.links?.length > 3 && (
                    <div className="flex items-center justify-center space-x-2">
                        {notifications.links.map((link, i) => (
                            <Button
                                key={i}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                className={!link.url ? "opacity-50" : ""}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
