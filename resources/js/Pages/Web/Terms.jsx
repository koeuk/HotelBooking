import LegalDocument from "@/components/LegalDocument";
import {
    FileText,
    Scale,
    UserCheck,
    CreditCard,
    CalendarX,
    AlertTriangle,
    Gavel,
    ShieldCheck,
} from "lucide-react";

const sections = [
    {
        id: "acceptance",
        icon: UserCheck,
        title: "Acceptance of terms",
        body: [
            "By creating an account, browsing, or booking a stay through HotelBook, you agree to these Terms of Service and our Privacy Policy.",
            "If you are using the service on behalf of an organization, you confirm you have authority to bind that organization to these terms.",
        ],
    },
    {
        id: "accounts",
        icon: ShieldCheck,
        title: "Accounts & eligibility",
        body: [
            "You must be at least 18 years old to create an account. You are responsible for keeping your login credentials confidential and for all activity under your account.",
            "We may suspend or terminate accounts that violate these terms, abuse our services, or attempt to disrupt the platform for other users.",
        ],
    },
    {
        id: "bookings",
        icon: CalendarX,
        title: "Bookings & cancellations",
        body: [
            "Each booking is subject to the rate, availability and cancellation policy of the specific property at the time of confirmation. These details are shown before you check out and repeated on your confirmation email.",
            "Changes and cancellations follow the property's published policy. Refunds, where applicable, are issued back to the original payment method within 7 to 14 business days.",
        ],
    },
    {
        id: "payments",
        icon: CreditCard,
        title: "Payments & pricing",
        body: [
            "Prices are shown in the currency selected at checkout and include applicable taxes unless stated otherwise. Payment is charged at the time of booking unless a pay-at-hotel option is selected.",
            "We reserve the right to correct obvious pricing errors. If a booking is affected, we'll contact you to confirm at the correct price or cancel with a full refund.",
        ],
    },
    {
        id: "conduct",
        icon: AlertTriangle,
        title: "User conduct",
        body: [
            "You agree not to misuse the service — including posting false reviews, scraping content, attempting to access other users' accounts, or bypassing security measures.",
            "Abusive, fraudulent or illegal activity will be reported to relevant authorities and may result in immediate account termination.",
        ],
    },
    {
        id: "liability",
        icon: Scale,
        title: "Liability",
        body: [
            "HotelBook acts as an intermediary between guests and hotels. The underlying stay is provided by the hotel and governed by their own terms. We are not liable for issues arising from a hotel's service, facilities or cancellations outside our control.",
            "To the maximum extent permitted by law, our total liability for any claim relating to the service is limited to the amount you paid for the booking giving rise to the claim.",
        ],
    },
    {
        id: "law",
        icon: Gavel,
        title: "Governing law",
        body: [
            "These terms are governed by the laws of the jurisdiction in which HotelBook is incorporated, without regard to conflict-of-law principles.",
            "Any disputes not resolved informally will be brought before the competent courts of that jurisdiction.",
        ],
    },
];

export default function Terms() {
    return (
        <LegalDocument
            title="Terms of Service"
            eyebrow="Terms of Service"
            eyebrowIcon={FileText}
            headline={
                <>
                    The{" "}
                    <span className="italic font-serif font-medium text-gradient-primary">
                        fine print
                    </span>
                    , made readable.
                </>
            }
            subtitle="The rules of the road when you book, browse, or stay with HotelBook."
            lastUpdated="January 2026"
            intro={`Welcome to HotelBook. These Terms of Service ("Terms") govern your use of our website, applications and booking services. Please read them carefully — they are a binding agreement between you and us.`}
            sections={sections}
            cta={{
                title: "Questions about these terms?",
                description: "Our legal team is happy to clarify anything.",
                email: "legal@hotelbook.com",
                secondary: {
                    icon: ShieldCheck,
                    label: "Privacy Policy",
                    href: "/privacy",
                },
            }}
        />
    );
}
