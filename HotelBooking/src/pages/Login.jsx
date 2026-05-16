import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, AlertCircle, Star, CheckCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex">
      {/* Left — atmospheric panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-foreground shrink-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200"
          alt="Hotel lobby"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-foreground/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 h-full">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-warm-sm">
              <span className="font-display text-white font-bold text-lg leading-none">
                H
              </span>
            </div>
            <span className="font-display text-white font-semibold text-xl tracking-tight">
              Hotel<span style={{ color: 'var(--color-primary-light)' }}>Stay</span>
            </span>
          </Link>

          {/* Quote */}
          <div>
            <blockquote className="font-display text-3xl font-semibold text-white leading-tight mb-5">
              "Your home away from home, perfected."
            </blockquote>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={13} className="fill-gold text-gold" />
              ))}
              <span className="text-white/50 text-sm ml-1">5-star service</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              "Free cancellation on most rooms",
              "24/7 dedicated concierge",
              "Best price guarantee",
            ].map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 text-white/70 text-sm"
              >
                <CheckCircle size={14} className="text-green-800 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-background overflow-y-auto">
        <div className="w-full max-w-md">
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
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Sign in to manage your bookings
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
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-light disabled:opacity-50 transition-colors shadow-warm-sm cursor-pointer mt-2"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-7 text-muted-foreground text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-800 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
