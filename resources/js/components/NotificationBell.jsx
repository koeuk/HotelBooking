import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils";

export default function NotificationBell() {
    const { auth } = usePage().props;
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // In a real app, you would fetch these or use echoes.
    // For now, we'll assume they are passed via props or fetched on mount.
    useEffect(() => {
        if (auth.user) {
            // Mock fetching notifications or listening to broadcast
            // fetch('/notifications').then(...)
        }
    }, [auth.user]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 font-semibold">
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-primary"
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <DropdownMenuSeparator />
                <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex flex-col items-start gap-1 p-4 cursor-pointer"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-sm font-medium">
                                        {notification.data.hotel_name}
                                    </span>
                                    {!notification.read_at && (
                                        <div className="h-2 w-2 rounded-full bg-primary" />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {notification.data.message}
                                </p>
                                <span className="text-[10px] text-muted-foreground mt-1">
                                    {new Date(
                                        notification.created_at,
                                    ).toLocaleDateString()}
                                </span>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-50">
                            <Bell className="h-8 w-8 mb-2" />
                            <p className="text-sm">No new notifications</p>
                        </div>
                    )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-center flex justify-center p-2 text-xs text-primary font-medium cursor-pointer">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
