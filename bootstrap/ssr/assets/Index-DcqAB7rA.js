import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, usePage, useForm, router } from "@inertiajs/react";
import { c as cn, B as Button } from "./button-Dm9784FB.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle, d as CardDescription } from "./card-BY9Lq84_.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback } from "./BackToTop-Cf3OnJBv.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { Settings, User, Lock, Send, AlertTriangle, Camera, Shield, Phone, Calendar, Check } from "lucide-react";
import { useState, useRef } from "react";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "sonner";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
const sidebarItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "integrations", label: "Integrations", icon: Send },
  { id: "danger", label: "Danger Zone", icon: AlertTriangle, danger: true }
];
function ProfileSection({ mustVerifyEmail, status }) {
  const { auth } = usePage().props;
  const user = auth.user;
  const avatarInput = useRef();
  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
    name: user.name,
    email: user.email
  });
  const submit = (e) => {
    e.preventDefault();
    patch(route("profile.update"));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    router.post(route("profile.avatar"), { avatar: file }, { forceFormData: true });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxs(Avatar, { className: "h-20 w-20 border-2 border-primary/20", children: [
          /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar }),
          /* @__PURE__ */ jsx(AvatarFallback, { className: "text-2xl font-bold bg-primary/10 text-primary", children: user.name?.charAt(0) })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => avatarInput.current?.click(),
            className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
            children: /* @__PURE__ */ jsx(Camera, { className: "h-6 w-6 text-white" })
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: avatarInput,
            type: "file",
            accept: "image/*",
            className: "hidden",
            onChange: handleAvatarChange
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: user.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: user.email }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2 flex-wrap", children: [
          /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            /* @__PURE__ */ jsx(Shield, { className: "h-3 w-3 mr-1" }),
            " ",
            user.role
          ] }),
          user.phone && /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-xs", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-3 w-3 mr-1" }),
            " ",
            user.phone
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "text-xs", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3 mr-1" }),
            " Joined",
            " ",
            new Date(user.created_at).toLocaleDateString()
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Profile Information" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Update your name and email address." })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 max-w-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              required: true
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              required: true
            }
          ),
          errors.email && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Save Changes" }),
          recentlySuccessful && /* @__PURE__ */ jsxs("span", { className: "text-sm text-green-600 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
            " Saved"
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function SecuritySection() {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current?.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current?.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Update Password" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Use a strong password to keep your account secure." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 max-w-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "current_password", children: "Current Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "current_password",
            ref: currentPasswordInput,
            type: "password",
            value: data.current_password,
            onChange: (e) => setData("current_password", e.target.value)
          }
        ),
        errors.current_password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.current_password })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "New Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              ref: passwordInput,
              type: "password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value)
            }
          ),
          errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Confirm Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password_confirmation",
              type: "password",
              value: data.password_confirmation,
              onChange: (e) => setData("password_confirmation", e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Updating..." : "Update Password" }),
        recentlySuccessful && /* @__PURE__ */ jsxs("span", { className: "text-sm text-green-600 flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }),
          " Updated"
        ] })
      ] })
    ] }) })
  ] });
}
function IntegrationsSection({ settings }) {
  const { data, setData, post, processing } = useForm({
    telegram_bot_token: settings.telegram_bot_token || "",
    telegram_chat_id: settings.telegram_chat_id || ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("dashboard.settings.update"));
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Send, { className: "h-5 w-5 text-blue-500" }),
        "Telegram Integration"
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Configure Telegram bot to receive booking notifications." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-4 max-w-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "telegram_bot_token", children: "Bot Token" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "telegram_bot_token",
            value: data.telegram_bot_token,
            onChange: (e) => setData("telegram_bot_token", e.target.value),
            placeholder: "e.g. 123456789:AABBccDDeeFFggHH..."
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Get this from @BotFather on Telegram." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "telegram_chat_id", children: "Chat / Group ID" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "telegram_chat_id",
            value: data.telegram_chat_id,
            onChange: (e) => setData("telegram_chat_id", e.target.value),
            placeholder: "e.g. -1001234567890"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "The Telegram chat or group ID where notifications will be sent." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Save Telegram Settings" }) })
    ] }) })
  ] });
}
function DangerSection() {
  const [open, setOpen] = useState(false);
  const passwordInput = useRef();
  const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
    password: ""
  });
  const deleteUser = (e) => {
    e.preventDefault();
    destroy(route("profile.destroy"), {
      preserveScroll: true,
      onSuccess: () => setOpen(false),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset()
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs(CardTitle, { className: "text-destructive flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5" }),
        "Danger Zone"
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Permanently delete your account and all associated data." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-md", children: "Once deleted, all data will be permanently removed. This cannot be undone." }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "destructive", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "mr-2 h-4 w-4" }),
          "Delete Account"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsx(DialogTitle, { children: "Are you absolutely sure?" }),
            /* @__PURE__ */ jsx(DialogDescription, { children: "This will permanently delete your account. Enter your password to confirm." })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: deleteUser, children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "delete-password", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "delete-password",
                  type: "password",
                  ref: passwordInput,
                  value: data.password,
                  onChange: (e) => setData("password", e.target.value),
                  placeholder: "Enter your password"
                }
              ),
              errors.password && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.password })
            ] }) }),
            /* @__PURE__ */ jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: () => {
                    setOpen(false);
                    clearErrors();
                    reset();
                  },
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx(Button, { type: "submit", variant: "destructive", disabled: processing, children: processing ? "Deleting..." : "Delete Account" })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function Index({ settings, mustVerifyEmail, status }) {
  const [activeSection, setActiveSection] = useState("profile");
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Settings" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold tracking-tight flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Settings, { className: "h-8 w-8" }),
          "Settings"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your account, security, and integrations." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-6", children: [
        /* @__PURE__ */ jsx("nav", { className: "w-56 shrink-0 hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "space-y-1 sticky top-28", children: sidebarItems.map((item) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveSection(item.id),
            className: cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all text-left",
              activeSection === item.id ? "bg-primary/10 text-primary" : item.danger ? "text-muted-foreground hover:text-destructive hover:bg-destructive/5" : "text-muted-foreground hover:text-foreground hover:bg-accent"
            ),
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: cn(
                "h-4 w-4",
                activeSection === item.id ? "text-primary" : item.danger ? "" : ""
              ) }),
              item.label
            ]
          },
          item.id
        )) }) }),
        /* @__PURE__ */ jsx("div", { className: "md:hidden w-full", children: /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-4", children: sidebarItems.map((item) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setActiveSection(item.id),
            className: cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all",
              activeSection === item.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            ),
            children: [
              /* @__PURE__ */ jsx(item.icon, { className: "h-3.5 w-3.5" }),
              item.label
            ]
          },
          item.id
        )) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          activeSection === "profile" && /* @__PURE__ */ jsx(ProfileSection, { mustVerifyEmail, status }),
          activeSection === "security" && /* @__PURE__ */ jsx(SecuritySection, {}),
          activeSection === "integrations" && /* @__PURE__ */ jsx(IntegrationsSection, { settings }),
          activeSection === "danger" && /* @__PURE__ */ jsx(DangerSection, {})
        ] })
      ] })
    ] })
  ] });
}
export {
  Index as default
};
