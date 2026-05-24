import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useCallback, useEffect, useRef } from "react";
import { usePage, router, Link } from "@inertiajs/react";
import { Bell, XIcon, Menu, Search, UserCircle, LogOut, LayoutDashboard, Hotel, BedDouble, Bed, CalendarCheck, CreditCard, Users, Sparkles, Star, Tag, BarChart3, Settings, HelpCircle, ChevronLeft } from "lucide-react";
import { c as cn, B as Button } from "./button-Dm9784FB.js";
import { D as DropdownMenu, c as DropdownMenuTrigger, d as DropdownMenuContent, g as DropdownMenuSeparator, h as DropdownMenuItem, A as Avatar, a as AvatarImage, b as AvatarFallback, e as DropdownMenuGroup, f as DropdownMenuLabel, T as Toaster, B as BackToTop } from "./BackToTop-Cf3OnJBv.js";
import { ScrollArea as ScrollArea$1 } from "@base-ui/react/scroll-area";
import { B as Badge } from "./badge-qMfuib1i.js";
import { T as ThemeToggle } from "./ThemeToggle-DzFfzEoP.js";
import { Dialog } from "@base-ui/react/dialog";
import { S as Separator } from "./separator-CBwNKPLd.js";
import { toast } from "sonner";
import { I as Input } from "./input-D6vmmPPF.js";
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(ScrollArea$1.Root, { "data-slot": "scroll-area", className: cn("relative", className), ...props, children: [
    /* @__PURE__ */ jsx(
      ScrollArea$1.Viewport,
      {
        "data-slot": "scroll-area-viewport",
        className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
        children
      }
    ),
    /* @__PURE__ */ jsx(ScrollBar, {}),
    /* @__PURE__ */ jsx(ScrollArea$1.Corner, {})
  ] });
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ScrollArea$1.Scrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      "data-orientation": orientation,
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        ScrollArea$1.Thumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}
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
function NotificationBell() {
  const { auth } = usePage().props;
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/web/api/notifications", {
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest"
        },
        credentials: "same-origin"
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || []);
        setUnreadCount(data.unread_count || 0);
      }
    } catch {
    }
  }, []);
  useEffect(() => {
    if (auth.user) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 3e4);
      return () => clearInterval(interval);
    }
  }, [auth.user, fetchNotifications]);
  const markAsRead = async (id) => {
    try {
      await fetch(`/web/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
        },
        credentials: "same-origin"
      });
      fetchNotifications();
    } catch {
    }
  };
  const markAllAsRead = async () => {
    try {
      await fetch("/web/api/notifications/read-all", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
        },
        credentials: "same-origin"
      });
      fetchNotifications();
    } catch {
    }
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
      /* @__PURE__ */ jsx(Bell, { className: "h-5 w-5" }),
      unreadCount > 0 && /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "destructive",
          className: "absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]",
          children: unreadCount > 9 ? "9+" : unreadCount
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-80", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 py-2 font-semibold", children: [
        /* @__PURE__ */ jsx("span", { children: "Notifications" }),
        unreadCount > 0 && /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-auto p-0 text-xs text-primary",
            onClick: markAllAsRead,
            children: "Mark all as read"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx(ScrollArea, { className: "h-[300px]", children: notifications.length > 0 ? notifications.map((notification) => /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          className: cn(
            "flex flex-col items-start gap-1 p-4 cursor-pointer",
            !notification.read_at && "bg-primary/5"
          ),
          onClick: () => markAsRead(notification.id),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between w-full", children: [
              /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: notification.data?.hotel_name || "Booking Update" }),
              !notification.read_at && /* @__PURE__ */ jsx("div", { className: "h-2 w-2 rounded-full bg-primary" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: notification.data?.message }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground mt-1", children: timeAgo(notification.created_at) })
          ]
        },
        notification.id
      )) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-full p-8 text-center opacity-50", children: [
        /* @__PURE__ */ jsx(Bell, { className: "h-8 w-8 mb-2" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "No new notifications" })
      ] }) })
    ] })
  ] });
}
function Sheet({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(Dialog.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog.Backdrop,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      Dialog.Popup,
      {
        "data-slot": "sheet-content",
        "data-side": side,
        className: cn(
          "fixed z-50 flex flex-col gap-4 bg-background bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            Dialog.Close,
            {
              "data-slot": "sheet-close",
              render: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "absolute top-3 right-3", size: "icon-sm" }),
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const navItems = [
  {
    name: "Dashboard",
    routeName: "dashboard.index",
    icon: LayoutDashboard,
    color: "text-blue-500"
  },
  {
    name: "Hotels",
    routeName: "dashboard.hotels.index",
    icon: Hotel,
    color: "text-emerald-500"
  },
  {
    name: "Room Types",
    routeName: "dashboard.room-types.index",
    icon: BedDouble,
    color: "text-indigo-500"
  },
  {
    name: "Rooms",
    routeName: "dashboard.rooms.index",
    icon: Bed,
    color: "text-violet-500"
  },
  {
    name: "Bookings",
    routeName: "dashboard.bookings.index",
    icon: CalendarCheck,
    color: "text-amber-500"
  },
  {
    name: "Payments",
    routeName: "dashboard.payments.index",
    icon: CreditCard,
    color: "text-rose-500"
  },
  {
    name: "Users",
    routeName: "dashboard.users.index",
    icon: Users,
    color: "text-cyan-500"
  },
  {
    name: "Amenities",
    routeName: "dashboard.amenities.index",
    icon: Sparkles,
    color: "text-teal-500"
  },
  {
    name: "Reviews",
    routeName: "dashboard.reviews.index",
    icon: Star,
    color: "text-yellow-500"
  },
  {
    name: "Coupons",
    routeName: "dashboard.coupons.index",
    icon: Tag,
    color: "text-pink-500"
  },
  {
    name: "Reports",
    routeName: "dashboard.reports.index",
    icon: BarChart3,
    color: "text-orange-500"
  },
  {
    name: "Notifications",
    routeName: "dashboard.notifications.index",
    icon: Bell,
    color: "text-rose-500"
  }
];
function DashboardLayout({ children }) {
  const { auth, flash } = usePage().props;
  const { url } = usePage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const mainRef = useRef(null);
  useEffect(() => {
    if (flash?.success) toast.success(flash.success);
    if (flash?.error) toast.error(flash.error);
  }, [flash]);
  const NavContent = () => /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full relative text-zinc-200 overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-900 dark:bg-zinc-950" }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-30" }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex flex-col h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6 flex items-center justify-between", children: /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("dashboard.index"),
          className: "flex items-center gap-2 group",
          children: [
            /* @__PURE__ */ jsx("div", { className: "h-9 w-9 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-glow group-hover:scale-110 transition-transform", children: "H" }),
            !isCollapsed && /* @__PURE__ */ jsxs("span", { className: "text-xl font-bold tracking-tight text-white animate-in fade-in slide-in-from-left-2 duration-300", children: [
              "Hotel",
              /* @__PURE__ */ jsx("span", { className: "text-gradient-primary", children: "Dashboard" })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs(ScrollArea, { className: "flex-1 px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1 py-4", children: [
          !isCollapsed && /* @__PURE__ */ jsx("p", { className: "px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300", children: "Main Menu" }),
          navItems.map((item) => {
            const itemUrl = route(item.routeName);
            const itemPath = new URL(itemUrl).pathname;
            const isActive = url === itemPath || itemPath !== "/dashboard" && url.startsWith(itemPath);
            return /* @__PURE__ */ jsxs(
              Link,
              {
                href: itemUrl,
                className: cn(
                  "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-2xl transition-all duration-300 ease-out-expo group relative",
                  isActive ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-white/5 hover:text-white"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    item.icon,
                    {
                      className: cn(
                        "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                        isActive ? "text-primary-foreground" : item.color
                      )
                    }
                  ),
                  !isCollapsed && /* @__PURE__ */ jsx("span", { className: "animate-in fade-in slide-in-from-left-2 duration-300", children: item.name })
                ]
              },
              item.name
            );
          })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-1 py-4 border-t border-slate-700/50", children: [
          !isCollapsed && /* @__PURE__ */ jsx("p", { className: "px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-300", children: "Support" }),
          (() => {
            const settingsPath = new URL(route("dashboard.settings.index")).pathname;
            const isSettingsActive = url.startsWith(settingsPath);
            return /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                Link,
                {
                  href: route("dashboard.settings.index"),
                  className: cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-2xl transition-all duration-300 ease-out-expo group relative",
                    isSettingsActive ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-white/5 hover:text-white"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(Settings, { className: cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110", isSettingsActive ? "text-primary-foreground" : "text-zinc-300") }),
                    !isCollapsed && /* @__PURE__ */ jsx("span", { className: "animate-in fade-in slide-in-from-left-2 duration-300", children: "Settings" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("button", { className: "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-2xl transition-all hover:bg-white/5 hover:text-white group", children: [
                /* @__PURE__ */ jsx(HelpCircle, { className: "h-5 w-5 text-zinc-300 group-hover:text-white" }),
                !isCollapsed && /* @__PURE__ */ jsx("span", { children: "Internal Help" })
              ] })
            ] });
          })()
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4 border-t border-white/5", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
          "button",
          {
            className: cn(
              "w-full glass rounded-2xl p-3 flex items-center gap-3 transition-all hover:bg-white/10 cursor-pointer",
              isCollapsed ? "justify-center px-2" : ""
            ),
            children: [
              /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8 border border-slate-700/30", children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: auth.user.avatar }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: auth.user.name.charAt(0) })
              ] }),
              !isCollapsed && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden text-left", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-white truncate", children: auth.user.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-zinc-300 truncate", children: auth.user.email })
                ] }),
                /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4 text-zinc-300 rotate-90" })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxs(
          DropdownMenuContent,
          {
            side: "top",
            align: "start",
            className: "w-56 mb-2",
            children: [
              /* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxs(Avatar, { className: "h-9 w-9", children: [
                  /* @__PURE__ */ jsx(AvatarImage, { src: auth.user.avatar }),
                  /* @__PURE__ */ jsx(AvatarFallback, { children: auth.user.name.charAt(0) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-hidden", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-bold truncate", children: auth.user.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate", children: auth.user.email })
                ] })
              ] }) }) }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get(route("dashboard.settings.index")), children: [
                /* @__PURE__ */ jsx(Settings, { className: "h-4 w-4" }),
                "Settings"
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsxs(
                DropdownMenuItem,
                {
                  className: "cursor-pointer text-rose-500 focus:text-rose-500",
                  onClick: () => router.post(route("dashboard.logout")),
                  children: [
                    /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                    "Log out"
                  ]
                }
              )
            ]
          }
        )
      ] }) })
    ] })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-zinc-100 dark:bg-zinc-900 font-sans", children: [
    /* @__PURE__ */ jsx(
      "aside",
      {
        className: cn(
          "hidden md:flex flex-col transition-all duration-300 border-r border-zinc-200 dark:border-slate-700/30 overflow-hidden",
          isCollapsed ? "w-20" : "w-72"
        ),
        children: /* @__PURE__ */ jsx(NavContent, {})
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col overflow-hidden relative", children: [
      /* @__PURE__ */ jsxs("header", { className: "h-20 flex items-center justify-between px-6 sticky top-0 z-30 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-zinc-200 dark:border-slate-700/30", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => setIsCollapsed(!isCollapsed),
              className: "hidden md:flex text-zinc-300",
              "aria-label": isCollapsed ? "Expand sidebar" : "Collapse sidebar",
              children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
            }
          ),
          /* @__PURE__ */ jsxs(
            Sheet,
            {
              open: isMobileOpen,
              onOpenChange: setIsMobileOpen,
              children: [
                /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "md:hidden",
                    "aria-label": "Open navigation",
                    children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
                  }
                ) }),
                /* @__PURE__ */ jsx(
                  SheetContent,
                  {
                    side: "left",
                    className: "w-72 p-0 bg-slate-800 dark:bg-zinc-900",
                    children: /* @__PURE__ */ jsx(NavContent, {})
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center relative group", children: [
            /* @__PURE__ */ jsx(Search, { className: "absolute left-4 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                variant: "soft",
                placeholder: "Search everything…",
                className: "pl-11 w-64"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex flex-col text-right mr-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-zinc-900 dark:text-white underline decoration-primary/50 underline-offset-4", children: "Management Dashboard" }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-zinc-300", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric"
            }) })
          ] }),
          /* @__PURE__ */ jsx(
            Separator,
            {
              orientation: "vertical",
              className: "h-6 mx-2 hidden sm:block"
            }
          ),
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsx(NotificationBell, {}),
          /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
              Button,
              {
                variant: "ghost",
                className: "relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all",
                children: /* @__PURE__ */ jsxs(Avatar, { className: "h-full w-full", children: [
                  /* @__PURE__ */ jsx(AvatarImage, { src: auth.user.avatar }),
                  /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-bold", children: auth.user.name.charAt(0) })
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxs(
              DropdownMenuContent,
              {
                className: "w-56 mt-2",
                align: "end",
                forceMount: true,
                children: [
                  /* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-sm font-bold leading-none", children: auth.user.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-xs leading-none text-zinc-300", children: auth.user.email })
                  ] }) }) }),
                  /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                  /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: () => router.get(route("dashboard.settings.index")), children: [
                    /* @__PURE__ */ jsx(UserCircle, { className: "h-4 w-4" }),
                    "Profile Settings"
                  ] }),
                  /* @__PURE__ */ jsxs(
                    DropdownMenuItem,
                    {
                      className: "text-rose-500 focus:text-rose-500 cursor-pointer",
                      onClick: () => router.post(route("dashboard.logout")),
                      children: [
                        /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
                        "Sign Out"
                      ]
                    }
                  )
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        "main",
        {
          ref: mainRef,
          className: "flex-1 overflow-y-auto overflow-x-hidden",
          children: [
            /* @__PURE__ */ jsx("div", { className: "p-6 md:p-10 min-h-full", children }),
            /* @__PURE__ */ jsxs("footer", { className: "p-6 text-center text-[10px] text-zinc-400 border-t border-zinc-200 dark:border-slate-700/30", children: [
              "© 2026 Hotel Booking Pro. Managed by",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: "koeuk" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", closeButton: true, richColors: true }),
    /* @__PURE__ */ jsx(BackToTop, { scrollContainer: mainRef })
  ] });
}
export {
  DashboardLayout as D
};
