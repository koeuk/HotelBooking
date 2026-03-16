import { Link, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    autoComplete="name"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    autoComplete="username"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div>
                    <p className="text-sm text-muted-foreground">
                        Your email address is unverified.{" "}
                        <Link
                            href={route("verification.send")}
                            method="post"
                            as="button"
                            className="text-primary underline hover:text-primary/80"
                        >
                            Click here to re-send the verification email.
                        </Link>
                    </p>
                    {status === "verification-link-sent" && (
                        <p className="mt-2 text-sm font-medium text-green-600">
                            A new verification link has been sent to your email address.
                        </p>
                    )}
                </div>
            )}

            <div className="flex items-center gap-3 pt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? "Saving..." : "Save Changes"}
                </Button>
                {recentlySuccessful && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                        <Check className="h-4 w-4" /> Saved
                    </span>
                )}
            </div>
        </form>
    );
}
