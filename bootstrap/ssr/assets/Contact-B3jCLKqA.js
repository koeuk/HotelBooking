import { jsxs, jsx } from "react/jsx-runtime";
import { W as WebLayout } from "./WebLayout-Dc8gJj4l.js";
import { usePage, useForm, Head } from "@inertiajs/react";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-BY9Lq84_.js";
import { B as Button } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { T as Textarea } from "./textarea-kC2BQjKr.js";
import { Mail, Phone, MapPin, CheckCircle2, Send } from "lucide-react";
import { useState, useEffect } from "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
function Contact() {
  const { auth, flash } = usePage().props;
  const [sent, setSent] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: auth?.user?.name || "",
    email: auth?.user?.email || "",
    subject: "",
    message: ""
  });
  useEffect(() => {
    if (flash?.success && !sent) setSent(true);
  }, [flash?.success]);
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("web.contact.send"), {
      preserveScroll: true,
      onSuccess: (page) => {
        if (page.props.flash?.error) return;
        setSent(true);
        reset("subject", "message");
      }
    });
  };
  const sendAnother = () => {
    setSent(false);
    reset("subject", "message");
  };
  return /* @__PURE__ */ jsxs(WebLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Contact Us" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold tracking-tight", children: [
          "Contact",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "us" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-lg text-muted-foreground", children: "Have questions? We'd love to hear from you." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
          {
            icon: Mail,
            title: "Email",
            text: "support@hotelbook.com"
          },
          {
            icon: Phone,
            title: "Phone",
            text: "+1 (555) 123-4567"
          },
          {
            icon: MapPin,
            title: "Address",
            text: "123 Booking Street, Travel City"
          }
        ].map((item, i) => /* @__PURE__ */ jsx(Card, { variant: "elevated", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2.5 rounded-xl bg-gradient-primary text-primary-foreground shrink-0", children: /* @__PURE__ */ jsx(item.icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: item.title }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground truncate", children: item.text })
          ] })
        ] }) }, i)) }),
        /* @__PURE__ */ jsxs(Card, { variant: "elevated", className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Send a message" }) }),
          /* @__PURE__ */ jsx(CardContent, { children: sent ? /* @__PURE__ */ jsxs("div", { className: "text-center py-10 animate-scale-in", children: [
            /* @__PURE__ */ jsx("div", { className: "inline-flex p-4 rounded-full bg-emerald-500/10 mb-4", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "h-8 w-8 text-emerald-600" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold", children: "Message sent!" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "We'll get back to you within 24 hours." }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "glass",
                shape: "pill",
                className: "mt-5",
                onClick: sendAnother,
                children: "Send another"
              }
            )
          ] }) : /* @__PURE__ */ jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx(
                      Label,
                      {
                        htmlFor: "name",
                        className: "text-xs uppercase tracking-wide text-muted-foreground",
                        children: "Name"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "name",
                        variant: "soft",
                        placeholder: "Your name",
                        value: data.name,
                        onChange: (e) => setData(
                          "name",
                          e.target.value
                        ),
                        required: true
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.name })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsx(
                      Label,
                      {
                        htmlFor: "email",
                        className: "text-xs uppercase tracking-wide text-muted-foreground",
                        children: "Email"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        id: "email",
                        type: "email",
                        variant: "soft",
                        placeholder: "your@email.com",
                        value: data.email,
                        onChange: (e) => setData(
                          "email",
                          e.target.value
                        ),
                        required: true
                      }
                    ),
                    errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(
                    Label,
                    {
                      htmlFor: "subject",
                      className: "text-xs uppercase tracking-wide text-muted-foreground",
                      children: "Subject"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Input,
                    {
                      id: "subject",
                      variant: "soft",
                      placeholder: "How can we help?",
                      value: data.subject,
                      onChange: (e) => setData(
                        "subject",
                        e.target.value
                      ),
                      required: true
                    }
                  ),
                  errors.subject && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.subject })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx(
                    Label,
                    {
                      htmlFor: "message",
                      className: "text-xs uppercase tracking-wide text-muted-foreground",
                      children: "Message"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Textarea,
                    {
                      id: "message",
                      placeholder: "Your message…",
                      rows: 5,
                      value: data.message,
                      onChange: (e) => setData(
                        "message",
                        e.target.value
                      ),
                      className: "rounded-2xl bg-muted/60 border-input px-4 py-3 focus-visible:bg-background focus-visible:border-primary/40 focus-visible:ring-4 focus-visible:ring-primary/15 transition-all duration-300",
                      required: true
                    }
                  ),
                  errors.message && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.message })
                ] }),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "submit",
                    variant: "gradient",
                    size: "xl",
                    shape: "pill",
                    className: "w-full",
                    disabled: processing,
                    children: [
                      /* @__PURE__ */ jsx(Send, { className: "h-4 w-4 mr-2" }),
                      processing ? "Sending…" : "Send message"
                    ]
                  }
                )
              ]
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Contact as default
};
