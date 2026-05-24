import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, router } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Button, c as cn } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { CheckCheck, Hotel, Calendar, Eye, Check, Bell } from "lucide-react";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
function timeAgo(dateString) {
  const now = /* @__PURE__ */ new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1e3);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
function Index({ notifications }) {
  const unreadCount = notifications.data.filter((n) => !n.read_at).length;
  const markAsRead = (id) => {
    router.patch(route("dashboard.notifications.read", id), {}, { preserveScroll: true });
  };
  const markAllAsRead = () => {
    router.patch(route("dashboard.notifications.readAll"), {}, { preserveScroll: true });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Notifications" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Notifications" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1", children: unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!" })
        ] }),
        unreadCount > 0 && /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: markAllAsRead, children: [
          /* @__PURE__ */ jsx(CheckCheck, { className: "mr-2 h-4 w-4" }),
          "Mark all as read"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: notifications.data.length > 0 ? /* @__PURE__ */ jsx("div", { className: "divide-y", children: notifications.data.map((notification) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex items-start gap-4 p-5 transition-colors",
            !notification.read_at && "bg-primary/5"
          ),
          children: [
            /* @__PURE__ */ jsx("div", { className: cn(
              "flex items-center justify-center h-10 w-10 rounded-full shrink-0",
              !notification.read_at ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            ), children: /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: notification.data?.title || notification.data?.hotel_name || "Notification" }),
                !notification.read_at && /* @__PURE__ */ jsx(Badge, { variant: "default", className: "text-[10px] px-1.5 py-0", children: "New" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-0.5 line-clamp-2", children: notification.data?.message }),
              /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1.5 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-3 w-3" }),
                timeAgo(notification.created_at)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              notification.data?.booking_id && /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "text-xs",
                  onClick: () => router.get(route("dashboard.bookings.show", notification.data.booking_id)),
                  children: [
                    /* @__PURE__ */ jsx(Eye, { className: "mr-1 h-3.5 w-3.5" }),
                    "View"
                  ]
                }
              ),
              !notification.read_at && /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "shrink-0 text-xs",
                  onClick: () => markAsRead(notification.id),
                  children: [
                    /* @__PURE__ */ jsx(Check, { className: "mr-1 h-3.5 w-3.5" }),
                    "Read"
                  ]
                }
              )
            ] })
          ]
        },
        notification.id
      )) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [
        /* @__PURE__ */ jsx(Bell, { className: "h-12 w-12 text-muted-foreground/30 mb-4" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "No notifications" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "You'll be notified when there are new bookings or updates." })
      ] }) }) }),
      notifications.links?.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center space-x-2", children: notifications.links.map((link, i) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: link.active ? "default" : "outline",
          size: "sm",
          disabled: !link.url,
          onClick: () => link.url && router.get(link.url),
          className: !link.url ? "opacity-50" : "",
          dangerouslySetInnerHTML: { __html: link.label }
        },
        i
      )) })
    ] })
  ] });
}
export {
  Index as default
};
