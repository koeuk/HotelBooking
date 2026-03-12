import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Hotel,
    BedDouble,
    Bed,
    CalendarCheck,
    CreditCard,
    Users,
    Bell,
    Menu,
    X,
    LogOut,
    UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

const navItems = [
    {
        name: "Dashboard",
        href: route("admin.dashboard"),
        icon: LayoutDashboard,
    },
    { name: "Hotels", href: route("admin.hotels.index"), icon: Hotel },
    {
        name: "Room Types",
        href: route("admin.room-types.index"),
        icon: BedDouble,
    },
    { name: "Rooms", href: route("admin.rooms.index"), icon: Bed },
    {
        name: "Bookings",
        href: route("admin.bookings.index"),
        icon: CalendarCheck,
    },
    { name: "Payments", href: route("admin.payments.index"), icon: CreditCard },
    { name: "Users", href: route("admin.users.index"), icon: Users },
];

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const NavContent = () => (
        <div className="flex flex-col h-full py-4">
            <div className="px-6 mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-primary">
                    Hotel Admin
                </h2>
            </div>
            <ScrollArea className="flex-1 px-3">
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                url.startsWith(item.href)
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );

    return (
        <div className="flex h-screen bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-card">
                <NavContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-4">
                        <Sheet
                            open={isMobileOpen}
                            onOpenChange={setIsMobileOpen}
                        >
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0">
                                <NavContent />
                            </SheetContent>
                        </Sheet>
                        <h1 className="text-lg font-semibold md:hidden">
                            Hotel Admin
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="relative h-8 w-8 rounded-full"
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback>
                                            {auth.user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {auth.user.name}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={route("profile.edit")}>
                                        <UserCircle className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full text-left"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page View */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
            <Toaster />
        </div>
    );
}
