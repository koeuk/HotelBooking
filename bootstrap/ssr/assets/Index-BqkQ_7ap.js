import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { usePage, Head, router, Link } from "@inertiajs/react";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent } from "./card-BY9Lq84_.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { B as Button, c as cn } from "./button-Dm9784FB.js";
import { Plus, DollarSign, Hotel, Bed, CalendarCheck, Clock, Users, TrendingUp, ChevronRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
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
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendValue,
  colorClass
}) => /* @__PURE__ */ jsxs(
  Card,
  {
    variant: "elevated",
    interactive: true,
    className: "relative overflow-hidden group",
    children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-700 ease-out-expo blur-xl",
            colorClass
          )
        }
      ),
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: title }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "p-2 rounded-xl",
              colorClass,
              "bg-opacity-10 ring-1 ring-inset",
              colorClass.replace("bg-", "ring-"),
              "ring-opacity-20"
            ),
            children: /* @__PURE__ */ jsx(
              Icon,
              {
                className: cn(
                  "h-4 w-4",
                  colorClass.replace("bg-", "text-")
                )
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold tracking-tight", children: value }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-2", children: [
          trend === "up" ? /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3 text-emerald-500 mr-1" }) : /* @__PURE__ */ jsx(Clock, { className: "h-3 w-3 text-amber-500 mr-1" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs font-medium", children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  trend === "up" ? "text-emerald-500" : "text-amber-500"
                ),
                children: trendValue
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground ml-1", children: description })
          ] })
        ] })
      ] })
    ]
  }
);
const getStatusBadge = (status) => {
  switch (status) {
    case "pending":
      return /* @__PURE__ */ jsxs(
        Badge,
        {
          variant: "outline",
          className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 shrink-0",
          children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3 mr-1" }),
            " Pending"
          ]
        }
      );
    case "confirmed":
      return /* @__PURE__ */ jsxs(Badge, { className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800 shrink-0", children: [
        /* @__PURE__ */ jsx(CalendarCheck, { className: "w-3 h-3 mr-1" }),
        " Confirmed"
      ] });
    case "cancelled":
      return /* @__PURE__ */ jsx(
        Badge,
        {
          variant: "destructive",
          className: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800 shrink-0",
          children: "Cancelled"
        }
      );
    case "completed":
      return /* @__PURE__ */ jsx(Badge, { className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 shrink-0", children: "Completed" });
    default:
      return /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: status });
  }
};
const STATUS_COLORS = {
  pending: "#f59e0b",
  confirmed: "#10b981",
  completed: "#3b82f6",
  cancelled: "#ef4444"
};
const ROLE_COLORS = {
  admin: "#6366f1",
  user: "#3b82f6"
};
const RATING_COLORS = ["#ef4444", "#f59e0b", "#eab308", "#84cc16", "#10b981"];
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-popover border rounded-lg shadow-lg p-3 text-sm", children: [
    /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: label }),
    payload.map((entry, i) => /* @__PURE__ */ jsxs(
      "p",
      {
        style: { color: entry.color },
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "h-2 w-2 rounded-full",
              style: { backgroundColor: entry.color }
            }
          ),
          entry.name,
          ":",
          " ",
          entry.name === "Revenue" ? `$${entry.value}` : entry.value
        ]
      },
      i
    ))
  ] });
};
function Dashboard({
  stats,
  recent_bookings,
  monthly_data = [],
  status_breakdown = {},
  user_roles = {},
  review_ratings = {},
  period = "year"
}) {
  const { auth } = usePage().props;
  const time = (/* @__PURE__ */ new Date()).getHours();
  const greeting = time < 12 ? "Good Morning" : time < 18 ? "Good Afternoon" : "Good Evening";
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Management Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl font-extrabold tracking-tight text-foreground", children: [
            greeting,
            ",",
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-primary", children: auth.user.name })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mt-1 text-lg", children: "Here's what's happening with your properties today." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center bg-muted rounded-full p-1", children: [
            { label: "Week", value: "week" },
            { label: "Month", value: "month" },
            { label: "Year", value: "year" }
          ].map((item) => /* @__PURE__ */ jsx(
            Button,
            {
              variant: period === item.value ? "default" : "ghost",
              size: "sm",
              className: cn(
                "rounded-full px-5 text-xs font-semibold",
                period === item.value ? "shadow-sm" : "hover:bg-transparent"
              ),
              onClick: () => router.get(route("dashboard.index"), { period: item.value }, { preserveState: true }),
              children: item.label
            },
            item.value
          )) }),
          /* @__PURE__ */ jsx(Link, { href: route("dashboard.hotels.create"), children: /* @__PURE__ */ jsxs(Button, { className: "shadow-lg hover:shadow-primary/20 transition-all rounded-full px-6", children: [
            /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
            " Add Property"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Revenue",
            value: `$${Number(stats.total_revenue).toLocaleString()}`,
            icon: DollarSign,
            description: "Total earnings",
            trend: "up",
            trendValue: "+12.5%",
            colorClass: "bg-emerald-500"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Properties",
            value: stats.total_hotels,
            icon: Hotel,
            description: "Active hotels",
            trend: "up",
            trendValue: "+2",
            colorClass: "bg-blue-500"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Total Rooms",
            value: stats.total_rooms,
            icon: Bed,
            description: "Inventory",
            trend: "up",
            trendValue: "+15",
            colorClass: "bg-indigo-500"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Bookings",
            value: stats.total_bookings,
            icon: CalendarCheck,
            description: "Total reservations",
            trend: "up",
            trendValue: "+24",
            colorClass: "bg-violet-500"
          }
        ),
        /* @__PURE__ */ jsx(
          StatCard,
          {
            title: "Pending",
            value: stats.pending_bookings,
            icon: Clock,
            description: "Check review",
            trend: "warning",
            trendValue: "Awaiting",
            colorClass: "bg-amber-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-7", children: [
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-5 border-none shadow-lg", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Booking & Revenue Overview" }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              period === "week" ? "Daily data for the last 7 days" : period === "month" ? "Data for the last 30 days" : "Monthly data for the last 12 months",
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-[300px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
            AreaChart,
            {
              data: monthly_data,
              margin: {
                top: 5,
                right: 10,
                left: 0,
                bottom: 0
              },
              children: [
                /* @__PURE__ */ jsxs("defs", { children: [
                  /* @__PURE__ */ jsxs(
                    "linearGradient",
                    {
                      id: "colorBookings",
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1",
                      children: [
                        /* @__PURE__ */ jsx(
                          "stop",
                          {
                            offset: "5%",
                            stopColor: "#6366f1",
                            stopOpacity: 0.3
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "stop",
                          {
                            offset: "95%",
                            stopColor: "#6366f1",
                            stopOpacity: 0
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "linearGradient",
                    {
                      id: "colorRevenue",
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1",
                      children: [
                        /* @__PURE__ */ jsx(
                          "stop",
                          {
                            offset: "5%",
                            stopColor: "#10b981",
                            stopOpacity: 0.3
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "stop",
                          {
                            offset: "95%",
                            stopColor: "#10b981",
                            stopOpacity: 0
                          }
                        )
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    className: "stroke-muted"
                  }
                ),
                /* @__PURE__ */ jsx(
                  XAxis,
                  {
                    dataKey: "month",
                    className: "text-xs",
                    tick: { fontSize: 12 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    yAxisId: "left",
                    className: "text-xs",
                    tick: { fontSize: 12 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    yAxisId: "right",
                    orientation: "right",
                    className: "text-xs",
                    tick: { fontSize: 12 }
                  }
                ),
                /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
                /* @__PURE__ */ jsx(
                  Area,
                  {
                    yAxisId: "left",
                    type: "monotone",
                    dataKey: "bookings",
                    name: "Bookings",
                    stroke: "#6366f1",
                    strokeWidth: 2,
                    fillOpacity: 1,
                    fill: "url(#colorBookings)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Area,
                  {
                    yAxisId: "right",
                    type: "monotone",
                    dataKey: "revenue",
                    name: "Revenue",
                    stroke: "#10b981",
                    strokeWidth: 2,
                    fillOpacity: 1,
                    fill: "url(#colorRevenue)"
                  }
                )
              ]
            }
          ) }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-2 border-none shadow-lg", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Booking Status" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Current breakdown by status." })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("div", { className: "h-[200px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
              /* @__PURE__ */ jsx(
                Pie,
                {
                  data: Object.entries(
                    status_breakdown
                  ).map(([name, value]) => ({
                    name,
                    value
                  })),
                  cx: "50%",
                  cy: "50%",
                  innerRadius: 50,
                  outerRadius: 80,
                  paddingAngle: 4,
                  dataKey: "value",
                  children: Object.keys(status_breakdown).map(
                    (key) => /* @__PURE__ */ jsx(
                      Cell,
                      {
                        fill: STATUS_COLORS[key]
                      },
                      key
                    )
                  )
                }
              ),
              /* @__PURE__ */ jsx(Tooltip, {})
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 mt-4", children: Object.entries(status_breakdown).map(
              ([key, value]) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "h-3 w-3 rounded-full",
                        style: {
                          backgroundColor: STATUS_COLORS[key]
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-xs capitalize text-muted-foreground", children: key }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold ml-auto", children: value })
                  ]
                },
                key
              )
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-lg", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-indigo-500" }),
              "Users"
            ] }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              stats.total_users,
              " total users"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("div", { className: "h-[180px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
              BarChart,
              {
                data: monthly_data,
                margin: {
                  top: 0,
                  right: 0,
                  left: -20,
                  bottom: 0
                },
                children: [
                  /* @__PURE__ */ jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      className: "stroke-muted"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    XAxis,
                    {
                      dataKey: "month",
                      tick: { fontSize: 10 }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    YAxis,
                    {
                      tick: { fontSize: 10 },
                      allowDecimals: false
                    }
                  ),
                  /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
                  /* @__PURE__ */ jsx(
                    Bar,
                    {
                      dataKey: "users",
                      name: "New Users",
                      fill: "#6366f1",
                      radius: [4, 4, 0, 0]
                    }
                  )
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mt-4 pt-3 border-t", children: Object.entries(user_roles).map(
              ([key, value]) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "h-3 w-3 rounded-full",
                        style: {
                          backgroundColor: ROLE_COLORS[key]
                        }
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-xs capitalize text-muted-foreground", children: key }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold", children: value })
                  ]
                },
                key
              )
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-lg", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-yellow-500" }),
              "Reviews"
            ] }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              stats.total_reviews,
              " total reviews"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("div", { className: "h-[180px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
              BarChart,
              {
                data: monthly_data,
                margin: {
                  top: 0,
                  right: 0,
                  left: -20,
                  bottom: 0
                },
                children: [
                  /* @__PURE__ */ jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      className: "stroke-muted"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    XAxis,
                    {
                      dataKey: "month",
                      tick: { fontSize: 10 }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    YAxis,
                    {
                      tick: { fontSize: 10 },
                      allowDecimals: false
                    }
                  ),
                  /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
                  /* @__PURE__ */ jsx(
                    Bar,
                    {
                      dataKey: "reviews",
                      name: "Reviews",
                      fill: "#eab308",
                      radius: [4, 4, 0, 0]
                    }
                  )
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2 mt-4 pt-3 border-t", children: Object.entries(review_ratings).map(
              ([key, value], i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xs w-14 text-muted-foreground", children: key }),
                    /* @__PURE__ */ jsx("div", { className: "flex-1 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "h-full rounded-full transition-all",
                        style: {
                          width: `${stats.total_reviews > 0 ? value / stats.total_reviews * 100 : 0}%`,
                          backgroundColor: RATING_COLORS[i]
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold w-6 text-right", children: value })
                  ]
                },
                key
              )
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-lg", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5 text-emerald-500" }),
              "Hotels"
            ] }),
            /* @__PURE__ */ jsxs(CardDescription, { children: [
              stats.total_hotels,
              " properties"
            ] })
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("div", { className: "h-[180px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
              AreaChart,
              {
                data: monthly_data,
                margin: {
                  top: 0,
                  right: 0,
                  left: -20,
                  bottom: 0
                },
                children: [
                  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
                    "linearGradient",
                    {
                      id: "colorHotels",
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1",
                      children: [
                        /* @__PURE__ */ jsx(
                          "stop",
                          {
                            offset: "5%",
                            stopColor: "#10b981",
                            stopOpacity: 0.3
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "stop",
                          {
                            offset: "95%",
                            stopColor: "#10b981",
                            stopOpacity: 0
                          }
                        )
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsx(
                    CartesianGrid,
                    {
                      strokeDasharray: "3 3",
                      className: "stroke-muted"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    XAxis,
                    {
                      dataKey: "month",
                      tick: { fontSize: 10 }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    YAxis,
                    {
                      tick: { fontSize: 10 },
                      allowDecimals: false
                    }
                  ),
                  /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
                  /* @__PURE__ */ jsx(
                    Area,
                    {
                      type: "monotone",
                      dataKey: "hotels",
                      name: "New Hotels",
                      stroke: "#10b981",
                      strokeWidth: 2,
                      fillOpacity: 1,
                      fill: "url(#colorHotels)"
                    }
                  )
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4 pt-3 border-t", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: stats.total_hotels }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Properties" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: stats.total_rooms }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Rooms" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: stats.total_rooms > 0 ? Math.round(
                  stats.total_rooms / stats.total_hotels
                ) : 0 }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Avg/Hotel" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-7", children: [
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-5 border-none shadow-lg bg-card/50 backdrop-blur-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Recent Reservations" }),
              /* @__PURE__ */ jsx(CardDescription, { children: "Last 5 bookings made across your platform." })
            ] }),
            /* @__PURE__ */ jsx(Link, { href: route("dashboard.bookings.index"), children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-primary font-semibold hover:bg-primary/5",
                children: [
                  "View all",
                  " ",
                  /* @__PURE__ */ jsx(ChevronRight, { className: "ml-1 h-4 w-4" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "rounded-xl border overflow-hidden bg-white/50 dark:bg-zinc-950/50", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { className: "bg-muted/30", children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "user" }),
              /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Hotel / Room" }),
              /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Check In" }),
              /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Total" }),
              /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Status" }),
              /* @__PURE__ */ jsx(TableHead, { className: "text-right font-bold pr-6", children: "Action" })
            ] }) }),
            /* @__PURE__ */ jsxs(TableBody, { children: [
              recent_bookings.map((booking) => /* @__PURE__ */ jsxs(
                TableRow,
                {
                  className: "hover:bg-muted/20 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(TableCell, { className: "py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold", children: booking.user.name.charAt(
                        0
                      ) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: booking.user.name }),
                        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: booking.user.email })
                      ] })
                    ] }) }),
                    /* @__PURE__ */ jsxs(TableCell, { children: [
                      /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: booking.room.hotel.name }),
                      /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                        "Room:",
                        " ",
                        booking.room.room_number
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: new Date(
                      booking.check_in_date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short"
                      }
                    ) }),
                    /* @__PURE__ */ jsxs(TableCell, { className: "font-bold text-sm text-primary", children: [
                      "$",
                      Number(
                        booking.total_price
                      ).toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsx(TableCell, { children: getStatusBadge(
                      booking.status
                    ) }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-right pr-6", children: /* @__PURE__ */ jsx(
                      Link,
                      {
                        href: route(
                          "dashboard.bookings.show",
                          booking.uuid
                        ),
                        children: /* @__PURE__ */ jsx(
                          Button,
                          {
                            variant: "ghost",
                            size: "icon",
                            className: "h-8 w-8 rounded-full hover:bg-primary hover:text-white transition-all",
                            children: /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                          }
                        )
                      }
                    ) })
                  ]
                },
                booking.id
              )),
              recent_bookings.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
                TableCell,
                {
                  colSpan: 6,
                  className: "text-center py-12 text-muted-foreground italic",
                  children: "No recent bookings found."
                }
              ) })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-lg bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white", children: [
            /* @__PURE__ */ jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Need help?" }),
              /* @__PURE__ */ jsx(CardDescription, { className: "text-white/80", children: "Check documentation or contact support." })
            ] }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "secondary",
                  className: "w-full justify-between group",
                  children: [
                    "View Guide",
                    " ",
                    /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "secondary",
                  className: "w-full justify-between group",
                  onClick: () => window.open(
                    "https://t.me/your_bot",
                    "_blank"
                  ),
                  children: [
                    "Telegram Support",
                    " ",
                    /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-lg", children: [
            /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "System Health" }) }),
            /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground uppercase font-bold tracking-tight", children: "Occupancy Rate" }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold", children: "78%" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-2 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-blue-500 w-[78%] rounded-full" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-muted-foreground uppercase font-bold tracking-tight", children: "Payment Target" }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold", children: "92%" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-2 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-emerald-500 w-[92%] rounded-full" }) })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as default
};
