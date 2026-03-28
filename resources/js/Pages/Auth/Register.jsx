import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Chrome, Facebook } from "lucide-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-muted-foreground">
                        Join our community of travelers and start booking
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="John Doe"
                            required
                            className="h-11"
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="name@example.com"
                            required
                            className="h-11"
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                                className="h-11"
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">
                                Confirm
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                                className="h-11"
                            />
                        </div>
                    </div>

                    <Button className="w-full h-11 text-base" disabled={processing}>
                        {processing ? "Creating account..." : "Sign up"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" asChild className="h-11 bg-red-500/10 border-red-500/30 text-red-600 hover:bg-red-500/20 hover:text-red-600 dark:text-red-400 dark:hover:text-red-400">
                        <a href={route("auth.google")}>
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </a>
                    </Button>
                    <Button variant="outline" asChild className="h-11 bg-blue-500/10 border-blue-500/30 text-blue-600 hover:bg-blue-500/20 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-400">
                        <a href={route("auth.facebook")}>
                            <Facebook className="mr-2 h-4 w-4" />
                            Facebook
                        </a>
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href={route("login")}
                        className="font-semibold text-primary hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
