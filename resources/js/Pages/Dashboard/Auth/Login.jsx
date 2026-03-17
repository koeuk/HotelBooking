import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck } from "lucide-react";

export default function Login({ status }) {
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
        post(route("dashboard.login"));
    };

    return (
        <GuestLayout>
            <Head title="Dashboard Login" />

            <div className="space-y-6 text-center">
                <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="bg-amber-500 p-2 rounded-lg">
                        <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Admin Hotel
                    </h1>
                    <p className="text-sm text-white/70">
                        Management access only
                    </p>
                </div>

                {status && (
                    <div className="p-3 text-sm font-medium text-green-400 bg-green-900/30 rounded-lg">
                        {status}
                    </div>
                )}

                <div className="relative">
                    <Separator className="bg-white/10" />
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="text-left">
                        <Label
                            htmlFor="login"
                            className="text-white/80 ml-1 mb-1 block"
                        >
                            Username or Email
                        </Label>
                        <Input
                            id="login"
                            type="text"
                            value={data.login}
                            onChange={(e) => setData("login", e.target.value)}
                            placeholder="Enter credentials"
                            required
                            autoComplete="username"
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-lg h-12 px-4 focus:ring-amber-500 focus:border-amber-500"
                        />
                        {errors.login && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.login}
                            </p>
                        )}
                    </div>

                    <div className="text-left">
                        <Label
                            htmlFor="password"
                            className="text-white/80 ml-1 mb-1 block"
                        >
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="••••••••"
                            required
                            autoComplete="current-password"
                            className="bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-lg h-12 px-4 focus:ring-amber-500 focus:border-amber-500"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={data.remember}
                                onCheckedChange={(checked) =>
                                    setData("remember", checked)
                                }
                                className="border-white/30 data-[state=checked]:bg-amber-500"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal text-white/70"
                            >
                                Secure Session
                            </Label>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-lg h-12 text-base bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg shadow-amber-900/20"
                        disabled={processing}
                    >
                        {processing
                            ? "Authenticating..."
                            : "Login to Dashboard"}
                    </Button>
                </form>

                <div className="pt-4 border-t border-white/10">
                    <Link
                        href={route("login")}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                        Return to Public Login
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
