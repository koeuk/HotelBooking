import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Plus,
    Eye,
    Edit,
    Trash2,
    ShieldCheck,
    User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Index({ users, auth }) {
    const [userToDelete, setUserToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        destroy(route("dashboard.users.destroy", userToDelete.uuid), {
            onSuccess: () => {
                setUserToDelete(null);
                toast.success("User deleted successfully");
            },
            onError: (err) => toast.error(err.msg || "Failed to delete user"),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Users Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            Users
                        </h2>
                        <p className="text-muted-foreground">
                            Manage user accounts and administrator roles.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("dashboard.users.create")}>
                            <Plus className="mr-2 h-4 w-4" /> Add User
                        </Link>
                    </Button>
                </div>

                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={user.avatar}
                                                    alt={user.name}
                                                />
                                                <AvatarFallback>
                                                    {user.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">
                                                {user.name}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || "-"}</TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={user.role}
                                            onValueChange={(v) => {
                                                router.patch(
                                                    route(
                                                        "dashboard.users.update",
                                                        user.uuid,
                                                    ),
                                                    {
                                                        name: user.name,
                                                        email: user.email,
                                                        role: v,
                                                    },
                                                    {
                                                        preserveScroll: true,
                                                    },
                                                );
                                            }}
                                            disabled={user.id === auth.user.id}
                                        >
                                            <SelectTrigger className="w-[110px] h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">
                                                    <span className="flex items-center gap-1.5">
                                                        <ShieldCheck className="w-3 h-3" />{" "}
                                                        Admin
                                                    </span>
                                                </SelectItem>
                                                <SelectItem value="user">
                                                    <span className="flex items-center gap-1.5">
                                                        <UserIcon className="w-3 h-3" />{" "}
                                                        User
                                                    </span>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.users.show",
                                                    user.uuid,
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
                                                    "dashboard.users.edit",
                                                    user.uuid,
                                                )}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        {user.id !== auth.user.id && (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() =>
                                                            setUserToDelete(
                                                                user,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            Are you absolutely
                                                            sure?
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot
                                                            be undone. This will
                                                            permanently delete
                                                            the user account for
                                                            <strong>
                                                                {" "}
                                                                {user.name}
                                                            </strong>
                                                            .
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() =>
                                                                setUserToDelete(
                                                                    null,
                                                                )
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            onClick={
                                                                handleDelete
                                                            }
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            {processing
                                                                ? "Deleting..."
                                                                : "Delete User"}
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {users.links.length > 3 && (
                    <div className="flex items-center justify-end space-x-2">
                        {users.links.map((link, i) => (
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
        </DashboardLayout>
    );
}
