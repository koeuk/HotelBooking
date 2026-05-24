import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { U as UserLayout } from "./UserLayout-Cqdl8mOt.js";
import { Head } from "@inertiajs/react";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { CheckCheck, Bell, Check, CreditCard, Calendar, Hotel } from "lucide-react";
import axios from "axios";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "./WebLayout-Dc8gJj4l.js";
import "./ThemeToggle-DzFfzEoP.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
const getIcon = (type) => {
  if (type?.includes("payment")) return CreditCard;
  if (type?.includes("booking")) return Calendar;
  return Hotel;
};
function Index() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/v1/notifications");
      setNotifications(res.data.notifications || []);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);
  const markAsRead = async (id) => {
    await axios.patch(`/api/v1/notifications/${id}/read`);
    setNotifications(
      (prev) => prev.map(
        (n) => n.id === id ? { ...n, read_at: (/* @__PURE__ */ new Date()).toISOString() } : n
      )
    );
  };
  const markAllAsRead = async () => {
    await axios.patch("/api/v1/notifications/read-all");
    setNotifications(
      (prev) => prev.map((n) => ({ ...n, read_at: n.read_at || (/* @__PURE__ */ new Date()).toISOString() }))
    );
  };
  const unreadCount = notifications.filter((n) => !n.read_at).length;
  return /* @__PURE__ */ jsxs(UserLayout, { title: "Notifications", children: [
    /* @__PURE__ */ jsx(Head, { title: "Notifications" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Notifications" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Stay updated on your bookings and activities." })
        ] }),
        unreadCount > 0 && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: markAllAsRead,
            children: [
              /* @__PURE__ */ jsx(CheckCheck, { className: "mr-2 h-4 w-4" }),
              "Mark all as read"
            ]
          }
        )
      ] }),
      loading ? /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Loading..." }) }) }) : notifications.length === 0 ? /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center justify-center py-16 text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full mb-4", children: /* @__PURE__ */ jsx(Bell, { className: "h-8 w-8 text-zinc-400" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-1", children: "All caught up!" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "You have no notifications at the moment." })
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: notifications.map((notification) => {
        const IconComponent = getIcon(notification.data?.type);
        const isUnread = !notification.read_at;
        return /* @__PURE__ */ jsx(
          Card,
          {
            className: `border-none shadow-sm transition-all ${isUnread ? "bg-primary/5 ring-1 ring-primary/10" : ""}`,
            children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex items-start gap-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `p-2 rounded-full shrink-0 ${isUnread ? "bg-primary/10" : "bg-zinc-100 dark:bg-zinc-800"}`,
                  children: /* @__PURE__ */ jsx(
                    IconComponent,
                    {
                      className: `h-5 w-5 ${isUnread ? "text-primary" : "text-zinc-400"}`
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: notification.data?.title || "Notification" }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: notification.data?.message || "" })
                  ] }),
                  isUnread && /* @__PURE__ */ jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20 shrink-0 text-[10px]", children: "New" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: new Date(
                    notification.created_at
                  ).toLocaleString() }),
                  isUnread && /* @__PURE__ */ jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-7 text-xs",
                      onClick: () => markAsRead(
                        notification.id
                      ),
                      children: [
                        /* @__PURE__ */ jsx(Check, { className: "mr-1 h-3 w-3" }),
                        "Mark read"
                      ]
                    }
                  )
                ] })
              ] })
            ] })
          },
          notification.id
        );
      }) })
    ] })
  ] });
}
export {
  Index as default
};
