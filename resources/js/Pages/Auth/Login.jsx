import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Chrome, Facebook } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>

                {status && (
                    <div className="p-3 text-sm font-medium text-green-600 bg-green-50 rounded-md">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="login">Email or Username</Label>
                        <Input
                            id="login"
                            type="text"
                            value={data.login}
                            onChange={(e) => setData("login", e.target.value)}
                            placeholder="Email or username"
                            required
                            autoComplete="username"
                        />
                        {errors.login && (
                            <p className="text-sm text-destructive">
                                {errors.login}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-xs text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) =>
                                setData("remember", checked)
                            }
                        />
                        <Label
                            htmlFor="remember"
                            className="text-sm font-normal"
                        >
                            Remember me for 30 days
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing ? "Logging in..." : "Log in"}
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

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" asChild className="w-full">
                        <a href={route("auth.google")}>
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                        <a href={route("auth.facebook")}>
                            <Facebook className="mr-2 h-4 w-4" />
                            Facebook
                        </a>
                    </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href={route("register")}
                        className="font-semibold text-primary hover:underline"
                    >
                        Sign up for free
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
