import { useState, useEffect } from "react";
import WebLayout from "@/Layouts/WebLayout";
import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, CheckCheck, Calendar, CreditCard, Hotel } from "lucide-react";
import axios from "axios";

const getIcon = (type) => {
    if (type?.includes("payment")) return CreditCard;
    if (type?.includes("booking")) return Calendar;
    return Hotel;
};

export default function Index() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get("/api/v1/notifications");
            setNotifications(res.data.notifications || []);
        } catch (e) {
            // silent
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {
        await axios.patch(`/api/v1/notifications/${id}/read`);
        setNotifications((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
            ),
        );
    };

    const markAllAsRead = async () => {
        await axios.patch("/api/v1/notifications/read-all");
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, read_at: n.read_at || new Date().toISOString() })),
        );
    };

    const unreadCount = notifications.filter((n) => !n.read_at).length;

    return (
        <WebLayout>
            <Head title="Notifications" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Notifications
                        </h2>
                        <p className="text-muted-foreground">
                            Stay updated on your bookings and activities.
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={markAllAsRead}
                        >
                            <CheckCheck className="mr-2 h-4 w-4" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {loading ? (
                    <Card className="border-none shadow-sm">
                        <CardContent className="flex items-center justify-center py-16">
                            <p className="text-muted-foreground">Loading...</p>
                        </CardContent>
                    </Card>
                ) : notifications.length === 0 ? (
                    <Card className="border-none shadow-sm">
                        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4">
                                <Bell className="h-8 w-8 text-zinc-400" />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">
                                All caught up!
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                You have no notifications at the moment.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => {
                            const IconComponent = getIcon(notification.data?.type);
                            const isUnread = !notification.read_at;
                            return (
                                <Card
                                    key={notification.id}
                                    className={`border-none shadow-sm transition-all ${isUnread ? "bg-primary/5 ring-1 ring-primary/10" : ""}`}
                                >
                                    <CardContent className="p-4 flex items-start gap-4">
                                        <div
                                            className={`p-2 rounded-full shrink-0 ${isUnread ? "bg-primary/10" : "bg-zinc-100 dark:bg-zinc-800"}`}
                                        >
                                            <IconComponent
                                                className={`h-5 w-5 ${isUnread ? "text-primary" : "text-zinc-400"}`}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {notification.data
                                                            ?.title ||
                                                            "Notification"}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground mt-0.5">
                                                        {notification.data
                                                            ?.message || ""}
                                                    </p>
                                                </div>
                                                {isUnread && (
                                                    <Badge className="bg-primary/10 text-primary border-primary/20 shrink-0 text-[10px]">
                                                        New
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(
                                                        notification.created_at,
                                                    ).toLocaleString()}
                                                </p>
                                                {isUnread && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 text-xs"
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification.id,
                                                            )
                                                        }
                                                    >
                                                        <Check className="mr-1 h-3 w-3" />
                                                        Mark read
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </WebLayout>
    );
}
