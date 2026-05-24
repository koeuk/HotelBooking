import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { L as LegalDocument } from "./LegalDocument-FRT8QlXM.js";
import { FileText, Database, UserCog, Cookie, Share2, Lock, ShieldCheck } from "lucide-react";
import "@inertiajs/react";
import "react";
import "./WebLayout-Dc8gJj4l.js";
import "./button-Dm9784FB.js";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "./badge-qMfuib1i.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
const sections = [
  {
    id: "collection",
    icon: Database,
    title: "Information we collect",
    body: [
      "We collect information you provide directly — your name, email, phone number, payment details, and any preferences you share during booking.",
      "We also collect technical data automatically, such as your device type, browser, IP address and interactions with our platform, to keep the service secure and improve it over time."
    ]
  },
  {
    id: "use",
    icon: UserCog,
    title: "How we use your data",
    body: [
      "Your information is used to process bookings, send confirmations and receipts, personalize recommendations, prevent fraud, and comply with legal obligations.",
      "We do not sell your personal data. Marketing emails are only sent when you opt in, and you can unsubscribe at any time from the footer of any email."
    ]
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies & similar tech",
    body: [
      "We use essential cookies to keep you signed in and remember your preferences, and analytics cookies to understand how the site is used.",
      "You can manage cookies in your browser settings. Disabling essential cookies may prevent parts of the site from working correctly."
    ]
  },
  {
    id: "sharing",
    icon: Share2,
    title: "Who we share with",
    body: [
      "We share the minimum information required with the hotels you book, payment processors, and infrastructure partners (hosting, email, analytics).",
      "All partners are bound by confidentiality agreements and are only allowed to use your data for the specific service we contract them for."
    ]
  },
  {
    id: "security",
    icon: Lock,
    title: "Security",
    body: [
      "All traffic is encrypted with TLS. Payment information is handled by PCI-DSS compliant processors and never stored raw on our servers.",
      "Access to personal data inside the company is limited to staff who need it to perform their role, and is logged and reviewed regularly."
    ]
  },
  {
    id: "rights",
    icon: ShieldCheck,
    title: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, export or delete your personal data, and to object to or restrict certain processing.",
      "To exercise any of these rights, contact us at privacy@hotelbook.com. We'll reply within 30 days."
    ]
  }
];
function Privacy() {
  return /* @__PURE__ */ jsx(
    LegalDocument,
    {
      title: "Privacy Policy",
      eyebrow: "Privacy Policy",
      eyebrowIcon: ShieldCheck,
      headline: /* @__PURE__ */ jsxs(Fragment, { children: [
        "Your",
        " ",
        /* @__PURE__ */ jsx("span", { className: "italic font-serif font-medium text-gradient-primary", children: "privacy" }),
        ", in plain language."
      ] }),
      subtitle: "What we collect, why we collect it, and the control you have over it.",
      lastUpdated: "January 2026",
      intro: `HotelBook ("we", "our", "us") respects your privacy. This policy explains how we handle the personal information you share when you use our website, book a stay, or contact our support team.`,
      sections,
      cta: {
        title: "Questions about your data?",
        description: "Write to our privacy team and we'll reply within 30 days.",
        email: "privacy@hotelbook.com",
        secondary: {
          icon: FileText,
          label: "Terms of Service",
          href: "/terms"
        }
      }
    }
  );
}
export {
  Privacy as default
};
