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

            <div className="space-y-7">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Create your{" "}
                        <span className="text-gradient-primary">account</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Join our community of travelers and start booking
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label
                            htmlFor="name"
                            className="text-xs uppercase tracking-wide text-muted-foreground"
                        >
                            Full name
                        </Label>
                        <Input
                            id="name"
                            variant="soft"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="John Doe"
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="text-xs uppercase tracking-wide text-muted-foreground"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            variant="soft"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="name@example.com"
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="text-xs uppercase tracking-wide text-muted-foreground"
                            >
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                variant="soft"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="password_confirmation"
                                className="text-xs uppercase tracking-wide text-muted-foreground"
                            >
                                Confirm
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                variant="soft"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                required
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="gradient"
                        size="xl"
                        shape="pill"
                        className="w-full"
                        disabled={processing}
                    >
                        {processing ? "Creating account…" : "Sign up"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-3 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="glass"
                        shape="pill"
                        size="lg"
                        asChild
                    >
                        <a href={route("auth.google")}>
                            <Chrome className="mr-2 h-4 w-4 text-rose-500" />
                            Google
                        </a>
                    </Button>
                    <Button
                        variant="glass"
                        shape="pill"
                        size="lg"
                        asChild
                    >
                        <a href={route("auth.facebook")}>
                            <Facebook className="mr-2 h-4 w-4 text-sky-500" />
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
