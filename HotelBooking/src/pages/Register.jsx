import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/api";
import {
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  Star,
  BedDouble,
} from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground";

  return (
    <div className="min-h-full flex">
      {/* Left — atmospheric panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-foreground shrink-0">
        <img
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200"
          alt="Luxury hotel room"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 to-foreground/95" />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-warm-sm">
              <span className="font-display text-white font-bold text-lg leading-none">
                H
              </span>
            </div>
            <span className="font-display text-white font-semibold text-xl tracking-tight">
              Hotel<span className="text-green-800-light">Stay</span>
            </span>
          </Link>

          <div>
            <blockquote className="font-display text-3xl font-semibold text-white leading-tight mb-5">
              "Luxury begins with a single reservation."
            </blockquote>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
              <span className="text-white/50 text-sm ml-1">
                5-star experience
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Free cancellation", icon: <Star size={14} /> },
              {
                label: "Exclusive member rates",
                icon: <BedDouble size={14} />,
              },
              { label: "Priority booking", icon: <Star size={14} /> },
              { label: "Loyalty rewards", icon: <Star size={14} /> },
            ].map(({ label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-white/70 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-background">
        <div className="w-full max-w-lg py-8">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-display text-white font-bold text-lg leading-none">
                H
              </span>
            </div>
            <span className="font-display text-foreground font-semibold text-xl">
              HotelStay
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              Create account
            </h1>
            <p className="text-muted-foreground">
              Join us and start booking your dream stays
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3">
              <AlertCircle size={16} className="shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <input
                    name="phone"
                    type="text"
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    size={16}
                  />
                  <input
                    name="password_confirmation"
                    type="password"
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light disabled:opacity-50 transition-colors shadow-warm-sm cursor-pointer mt-2"
            >
              {loading ? "Creating Account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-7 text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-800 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
