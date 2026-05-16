import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, Shield, Clock, Star, Users, MapPin } from 'lucide-react';

export default function About() {
    const stats = [
        { label: 'Hotels Listed', value: '500+', icon: <Hotel size={24} /> },
        { label: 'Happy Guests', value: '50,000+', icon: <Users size={24} /> },
        { label: 'Cities Covered', value: '120+', icon: <MapPin size={24} /> },
        { label: 'Avg. Rating', value: '4.8 / 5', icon: <Star size={24} /> },
    ];

    const values = [
        {
            icon: <Shield size={28} />,
            title: 'Trusted & Secure',
            desc: 'Every booking is protected. Your payment and personal data are always safe with us.',
        },
        {
            icon: <Clock size={28} />,
            title: 'Free Cancellation',
            desc: 'Plans change. Cancel any eligible booking for free up to 24 hours before check-in.',
        },
        {
            icon: <Star size={28} />,
            title: 'Best Price Guarantee',
            desc: 'Find a lower price elsewhere? We\'ll match it — no questions asked.',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-white border-b border-slate-100 py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
                        <Hotel size={32} />
                    </div>
                    <h1 className="text-5xl font-extrabold text-slate-900 mb-4">About HotelStay</h1>
                    <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        We make finding and booking the perfect hotel simple, fast, and affordable —
                        whether you're travelling for business or leisure.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-3">
                                {s.icon}
                            </div>
                            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
                            <div className="text-sm text-slate-500 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission */}
            <section className="max-w-4xl mx-auto px-4 pb-16">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-10 mb-10">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        HotelStay was built with one goal: remove the friction from hotel booking.
                        We partner with hotels across the globe to offer real-time availability,
                        transparent pricing, and a seamless checkout experience — so you spend less
                        time planning and more time enjoying your stay.
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((v, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                                {v.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-primary py-16 text-center">
                <h2 className="text-3xl font-extrabold text-white mb-4">Ready to find your perfect stay?</h2>
                <p className="text-primary-foreground/80 mb-8 text-lg">Browse hundreds of hotels and book in seconds.</p>
                <Link
                    to="/hotels"
                    className="inline-block bg-white text-primary font-bold px-10 py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg"
                >
                    Browse Hotels
                </Link>
            </section>
        </div>
    );
}
