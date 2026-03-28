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
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>

                {status && (
                    <div className="p-3 text-sm font-medium text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/30 rounded-lg">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="login">Email or username</Label>
                        <Input
                            id="login"
                            type="text"
                            value={data.login}
                            onChange={(e) => setData("login", e.target.value)}
                            placeholder="you@example.com"
                            required
                            autoComplete="username"
                            className="h-11"
                        />
                        {errors.login && (
                            <p className="text-sm text-destructive">{errors.login}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                            className="h-11"
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData("remember", checked)}
                        />
                        <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                            Remember me
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-base"
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
                        <span className="px-2 bg-background text-muted-foreground">
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
                    Don't have an account?{" "}
                    <Link
                        href={route("register")}
                        className="font-semibold text-primary hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </GuestLayout>
    );
}
