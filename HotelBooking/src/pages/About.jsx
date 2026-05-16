import { Link } from 'react-router-dom';
import { Hotel, Shield, Clock, Star, Users, MapPin, ArrowRight } from 'lucide-react';

export default function About() {
    const stats = [
        { label: 'Happy Guests', value: '50,000+', icon: <Users size={22} /> },
        { label: 'Cities Covered', value: '120+', icon: <MapPin size={22} /> },
        { label: 'Avg. Rating', value: '4.8 / 5', icon: <Star size={22} /> },
        { label: 'Years of Service', value: '12+', icon: <Hotel size={22} /> },
    ];

    const values = [
        {
            icon: <Shield size={26} />,
            title: 'Trusted & Secure',
            desc: 'Every booking is protected. Your payment and personal data are always safe with us.',
        },
        {
            icon: <Clock size={26} />,
            title: 'Free Cancellation',
            desc: 'Plans change. Cancel any eligible booking for free up to 24 hours before check-in.',
        },
        {
            icon: <Star size={26} />,
            title: 'Best Price Guarantee',
            desc: "Find a lower price elsewhere? We'll match it — no questions asked.",
        },
    ];

    return (
        <div>
            {/* Hero */}
            <section className="relative overflow-hidden py-24 px-4">
                <div className="absolute inset-0 bg-foreground" />
                <img
                    src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600"
                    alt="Hotel"
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 to-foreground/90" />
                <div className="relative z-10 max-w-3xl mx-auto text-center">
                    <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-4">Our Story</p>
                    <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        About HotelStay
                    </h1>
                    <p className="text-white/65 text-xl leading-relaxed max-w-2xl mx-auto">
                        We make finding and booking the perfect hotel simple, fast, and affordable —
                        whether you're travelling for business or leisure.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-5xl mx-auto px-4 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-card rounded-2xl border border-border shadow-warm-sm p-6 text-center">
                            <div className="inline-flex items-center justify-center w-11 h-11 bg-primary/10 text-primary rounded-xl mb-3">
                                {s.icon}
                            </div>
                            <div className="font-display text-2xl font-bold text-foreground">{s.value}</div>
                            <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="max-w-4xl mx-auto px-4 pb-16">
                <div className="bg-card rounded-3xl border border-border shadow-warm p-10 mb-8">
                    <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Mission</p>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        HotelStay was built with one goal: remove the friction from hotel booking.
                        We partner with hotels across the globe to offer real-time availability,
                        transparent pricing, and a seamless checkout experience — so you spend less
                        time planning and more time enjoying your stay.
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {values.map((v, i) => (
                        <div key={i} className="bg-card rounded-2xl border border-border shadow-warm-sm p-6">
                            <div className="inline-flex items-center justify-center w-11 h-11 bg-primary/10 text-primary rounded-xl mb-4">
                                {v.icon}
                            </div>
                            <h3 className="font-display text-lg font-bold text-foreground mb-2">{v.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden py-20 px-4 mb-0">
                <div className="absolute inset-0 bg-primary" />
                <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600"
                    alt="Hotel pool"
                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                />
                <div className="relative z-10 text-center max-w-xl mx-auto">
                    <h2 className="font-display text-4xl font-bold text-white mb-4">Ready for your perfect stay?</h2>
                    <p className="text-white/70 mb-8 text-lg">Browse our rooms and book in seconds.</p>
                    <Link
                        to="/rooms"
                        className="inline-flex items-center gap-2 bg-white text-primary font-bold px-10 py-4 rounded-2xl hover:bg-primary-foreground transition-colors shadow-warm"
                    >
                        Browse Rooms <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
