import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { Head, router } from "@inertiajs/react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BY9Lq84_.js";
import { c as cn, B as Button } from "./button-Dm9784FB.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { A as Avatar, a as AvatarImage, b as AvatarFallback, D as DropdownMenu, c as DropdownMenuTrigger, d as DropdownMenuContent, e as DropdownMenuGroup, h as DropdownMenuItem } from "./BackToTop-Cf3OnJBv.js";
import { BarChart3, CalendarCheck, DollarSign, Users, Ban, Hotel, Star, TrendingDown, CreditCard, Download, FileText, FileSpreadsheet } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import "react";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "sonner";
import "./input-D6vmmPPF.js";
import "@base-ui/react/input";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "@base-ui/react/select";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
function exportPDF(title, columns, rows, filename = "report", options = {}) {
  const doc = new jsPDF({
    orientation: options.landscape ? "landscape" : "portrait"
  });
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(title, 14, 22);
  if (options.subtitle) {
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(options.subtitle, 14, 30);
  }
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text(`Generated: ${(/* @__PURE__ */ new Date()).toLocaleString()}`, 14, options.subtitle ? 36 : 30);
  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: options.subtitle ? 42 : 36,
    styles: {
      fontSize: 9,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [99, 102, 241],
      textColor: 255,
      fontStyle: "bold"
    },
    alternateRowStyles: {
      fillColor: [245, 245, 250]
    }
  });
  doc.save(`${filename}.pdf`);
}
function exportExcel(title, columns, rows, filename = "report") {
  const data = [columns, ...rows];
  const ws = XLSX.utils.aoa_to_sheet(data);
  const colWidths = columns.map((col, i) => {
    const maxLen = Math.max(
      col.length,
      ...rows.map((row) => String(row[i] ?? "").length)
    );
    return { wch: Math.min(maxLen + 2, 40) };
  });
  ws["!cols"] = colWidths;
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, title.substring(0, 31));
  const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([buf], { type: "application/octet-stream" }), `${filename}.xlsx`);
}
const periodLabels = { weekly: "Weekly", monthly: "Monthly", yearly: "Yearly" };
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ jsxs("div", { className: "bg-popover border rounded-lg shadow-lg p-3 text-sm", children: [
    /* @__PURE__ */ jsx("p", { className: "font-bold mb-1", children: label }),
    payload.map((entry, i) => /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "h-2 w-2 rounded-full",
          style: { backgroundColor: entry.color }
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
        entry.name,
        ":"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: entry.name === "Revenue" ? `$${entry.value.toLocaleString()}` : entry.value })
    ] }, i))
  ] });
};
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    confirmed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
    completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    cancelled: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
    paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
  };
  return /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "outline",
      className: cn("text-[10px] capitalize", styles[status]),
      children: status
    }
  );
};
const SummaryCard = ({ title, value, icon: Icon, color }) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
  /* @__PURE__ */ jsx("div", { className: cn("p-3 rounded-xl", color), children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 text-white" }) }),
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold", children: value }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: title })
  ] })
] }) });
const ExportButton = ({ onPDF, onExcel }) => /* @__PURE__ */ jsxs(DropdownMenu, { children: [
  /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", children: [
    /* @__PURE__ */ jsx(Download, { className: "h-4 w-4 mr-1" }),
    " Export"
  ] }) }),
  /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
    /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: onPDF, children: [
      /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4" }),
      " PDF"
    ] }),
    /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "cursor-pointer", onClick: onExcel, children: [
      /* @__PURE__ */ jsx(FileSpreadsheet, { className: "h-4 w-4" }),
      " Excel"
    ] })
  ] }) })
] });
const BOOKING_STATUS_COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444"];
const PAYMENT_STATUS_COLORS = ["#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];
const PAYMENT_METHOD_COLORS = ["#6366f1", "#10b981", "#3b82f6"];
const DonutChart = ({ data, colors, title }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  return /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: title }) }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx("div", { className: "h-[200px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
        /* @__PURE__ */ jsx(
          Pie,
          {
            data: data.filter((d) => d.value > 0),
            cx: "50%",
            cy: "50%",
            innerRadius: 55,
            outerRadius: 85,
            paddingAngle: 3,
            dataKey: "value",
            children: data.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: colors[i] }, i))
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            formatter: (value, name) => [
              `${value} (${total > 0 ? (value / total * 100).toFixed(1) : 0}%)`,
              name
            ]
          }
        )
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-4 gap-y-2 mt-2", children: data.map((item, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "h-3 w-3 rounded-full shrink-0",
                style: { backgroundColor: colors[i] }
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground truncate", children: item.name }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold ml-auto", children: item.value })
          ]
        },
        item.name
      )) })
    ] })
  ] });
};
function Index({
  reportData,
  period,
  year,
  availableYears,
  summary,
  top_hotels,
  recent_bookings,
  recent_users,
  recent_reviews,
  top_payments,
  booking_statuses = [],
  payment_statuses = [],
  payment_methods = []
}) {
  const changePeriod = (p) => router.get(
    route("dashboard.reports.index"),
    { period: p, year },
    { preserveState: true }
  );
  const changeYear = (y) => router.get(
    route("dashboard.reports.index"),
    { period, year: y },
    { preserveState: true }
  );
  const sub = `${periodLabels[period]} Report${period !== "yearly" ? ` — ${year}` : ""}`;
  const exportChartData = (format) => {
    const cols = [
      "Period",
      "Bookings",
      "Revenue ($)",
      "Users",
      "Reviews",
      "Hotels",
      "Cancelled"
    ];
    const rows = reportData.map((d) => [
      d.label,
      d.bookings,
      d.revenue,
      d.users,
      d.reviews,
      d.hotels,
      d.cancelled
    ]);
    if (format === "pdf")
      exportPDF(
        "Overview Report",
        cols,
        rows,
        `overview-report-${period}`,
        { subtitle: sub, landscape: true }
      );
    else exportExcel("Overview", cols, rows, `overview-report-${period}`);
  };
  const exportBookings = (format) => {
    const cols = [
      "user",
      "Email",
      "Hotel",
      "Room",
      "Check In",
      "Check Out",
      "Total ($)",
      "Status"
    ];
    const rows = recent_bookings.map((b) => [
      b.user?.name,
      b.user?.email,
      b.room?.hotel?.name,
      b.room?.room_type?.name || b.room?.room_number,
      b.check_in_date,
      b.check_out_date,
      b.total_price,
      b.status
    ]);
    if (format === "pdf")
      exportPDF("Bookings Report", cols, rows, "bookings-report", {
        subtitle: sub,
        landscape: true
      });
    else exportExcel("Bookings", cols, rows, "bookings-report");
  };
  const exportHotels = (format) => {
    const cols = [
      "Hotel",
      "City",
      "Country",
      "Rooms",
      "Reviews",
      "Avg Rating"
    ];
    const rows = top_hotels.map((h) => [
      h.name,
      h.city,
      h.country,
      h.rooms_count,
      h.reviews_count,
      h.reviews_avg_rating ? Number(h.reviews_avg_rating).toFixed(1) : "—"
    ]);
    if (format === "pdf")
      exportPDF("Hotels Report", cols, rows, "hotels-report", {
        subtitle: sub
      });
    else exportExcel("Hotels", cols, rows, "hotels-report");
  };
  const exportUsers = (format) => {
    const cols = ["Name", "Email", "Role", "Bookings", "Joined"];
    const rows = recent_users.map((u) => [
      u.name,
      u.email,
      u.role,
      u.bookings_count,
      new Date(u.created_at).toLocaleDateString()
    ]);
    if (format === "pdf")
      exportPDF("Users Report", cols, rows, "users-report", {
        subtitle: sub
      });
    else exportExcel("Users", cols, rows, "users-report");
  };
  const exportReviews = (format) => {
    const cols = ["Hotel", "user", "Rating", "Comment", "Date"];
    const rows = recent_reviews.map((r) => [
      r.hotel?.name,
      r.user?.name,
      `${r.rating}/5`,
      r.comment ? r.comment.substring(0, 80) : "—",
      new Date(r.created_at).toLocaleDateString()
    ]);
    if (format === "pdf")
      exportPDF("Reviews Report", cols, rows, "reviews-report", {
        subtitle: sub
      });
    else exportExcel("Reviews", cols, rows, "reviews-report");
  };
  const exportPayments = (format) => {
    const cols = [
      "Transaction ID",
      "user",
      "Hotel",
      "Amount ($)",
      "Method",
      "Status",
      "Paid At"
    ];
    const rows = top_payments.map((p) => [
      p.transaction_id || "—",
      p.booking?.user?.name,
      p.booking?.room?.hotel?.name,
      p.amount,
      p.method,
      p.status,
      p.paid_at || "—"
    ]);
    if (format === "pdf")
      exportPDF("Payments Report", cols, rows, "payments-report", {
        subtitle: sub,
        landscape: true
      });
    else exportExcel("Payments", cols, rows, "payments-report");
  };
  const exportAll = (format) => {
    if (format === "excel") {
      const XLSX2 = require("xlsx");
      const wb = XLSX2.utils.book_new();
      const addSheet = (name, cols, rows) => {
        const ws = XLSX2.utils.aoa_to_sheet([cols, ...rows]);
        XLSX2.utils.book_append_sheet(wb, ws, name.substring(0, 31));
      };
      addSheet(
        "Overview",
        [
          "Period",
          "Bookings",
          "Revenue",
          "Users",
          "Reviews",
          "Hotels",
          "Cancelled"
        ],
        reportData.map((d) => [
          d.label,
          d.bookings,
          d.revenue,
          d.users,
          d.reviews,
          d.hotels,
          d.cancelled
        ])
      );
      addSheet(
        "Bookings",
        ["user", "Email", "Hotel", "Total", "Status"],
        recent_bookings.map((b) => [
          b.user?.name,
          b.user?.email,
          b.room?.hotel?.name,
          b.total_price,
          b.status
        ])
      );
      addSheet(
        "Hotels",
        ["Hotel", "City", "Country", "Rooms", "Reviews", "Rating"],
        top_hotels.map((h) => [
          h.name,
          h.city,
          h.country,
          h.rooms_count,
          h.reviews_count,
          h.reviews_avg_rating ? Number(h.reviews_avg_rating).toFixed(1) : "—"
        ])
      );
      addSheet(
        "Users",
        ["Name", "Email", "Role", "Bookings"],
        recent_users.map((u) => [
          u.name,
          u.email,
          u.role,
          u.bookings_count
        ])
      );
      addSheet(
        "Reviews",
        ["Hotel", "user", "Rating", "Date"],
        recent_reviews.map((r) => [
          r.hotel?.name,
          r.user?.name,
          r.rating,
          new Date(r.created_at).toLocaleDateString()
        ])
      );
      addSheet(
        "Payments",
        ["Transaction", "user", "Hotel", "Amount", "Method", "Status"],
        top_payments.map((p) => [
          p.transaction_id,
          p.booking?.user?.name,
          p.booking?.room?.hotel?.name,
          p.amount,
          p.method,
          p.status
        ])
      );
      const { saveAs: saveAs2 } = require("file-saver");
      const buf = XLSX2.write(wb, { bookType: "xlsx", type: "array" });
      saveAs2(
        new Blob([buf], { type: "application/octet-stream" }),
        `full-report-${period}-${year}.xlsx`
      );
    } else {
      exportChartData("pdf");
    }
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Reports" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BarChart3, { className: "h-8 w-8" }),
            " Reports"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground mt-1", children: [
            "Complete analytics",
            period !== "yearly" ? ` for ${year}` : "",
            " —",
            " ",
            period,
            " view."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex bg-muted rounded-lg p-1", children: ["weekly", "monthly", "yearly"].map((p) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => changePeriod(p),
              className: cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all capitalize",
                period === p ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              ),
              children: p
            },
            p
          )) }),
          period !== "yearly" && /* @__PURE__ */ jsxs(
            Select,
            {
              value: String(year),
              onValueChange: changeYear,
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[100px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: availableYears.map((y) => /* @__PURE__ */ jsx(SelectItem, { value: String(y), children: y }, y)) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            ExportButton,
            {
              onPDF: () => exportAll("pdf"),
              onExcel: () => exportAll("excel")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsx(
          SummaryCard,
          {
            title: "Total Bookings",
            value: summary.total_bookings,
            icon: CalendarCheck,
            color: "bg-indigo-500"
          }
        ),
        /* @__PURE__ */ jsx(
          SummaryCard,
          {
            title: "Revenue",
            value: `$${summary.total_revenue.toLocaleString()}`,
            icon: DollarSign,
            color: "bg-emerald-500"
          }
        ),
        /* @__PURE__ */ jsx(
          SummaryCard,
          {
            title: "Users",
            value: summary.total_users,
            icon: Users,
            color: "bg-blue-500"
          }
        ),
        /* @__PURE__ */ jsx(
          SummaryCard,
          {
            title: "Cancel Rate",
            value: `${summary.cancellation_rate}%`,
            icon: Ban,
            color: "bg-rose-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-7", children: [
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-4 border-none shadow-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Bookings & Revenue" }),
            /* @__PURE__ */ jsx(
              ExportButton,
              {
                onPDF: () => exportChartData("pdf"),
                onExcel: () => exportChartData("excel")
              }
            )
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-[300px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
            AreaChart,
            {
              data: reportData,
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
                      id: "rb",
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
                      id: "rr",
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
                    dataKey: "label",
                    tick: { fontSize: 11 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    yAxisId: "l",
                    tick: { fontSize: 11 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    yAxisId: "r",
                    orientation: "right",
                    tick: { fontSize: 11 }
                  }
                ),
                /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
                /* @__PURE__ */ jsx(Legend, {}),
                /* @__PURE__ */ jsx(
                  Area,
                  {
                    yAxisId: "l",
                    type: "monotone",
                    dataKey: "bookings",
                    name: "Bookings",
                    stroke: "#6366f1",
                    strokeWidth: 2,
                    fill: "url(#rb)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Area,
                  {
                    yAxisId: "r",
                    type: "monotone",
                    dataKey: "revenue",
                    name: "Revenue",
                    stroke: "#10b981",
                    strokeWidth: 2,
                    fill: "url(#rr)"
                  }
                )
              ]
            }
          ) }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-3 border-none shadow-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Recent Bookings" }),
            /* @__PURE__ */ jsx(
              ExportButton,
              {
                onPDF: () => exportBookings("pdf"),
                onExcel: () => exportBookings("excel")
              }
            )
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "user" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Hotel" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Total" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: recent_bookings.map((b) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxs(TableCell, { className: "py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: b.user?.name }),
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground", children: b.user?.email })
              ] }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-xs", children: b.room?.hotel?.name }),
              /* @__PURE__ */ jsxs(TableCell, { className: "text-sm font-bold text-primary", children: [
                "$",
                b.total_price
              ] }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                StatusBadge,
                {
                  status: b.status
                }
              ) })
            ] }, b.id)) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-7", children: [
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-4 border-none shadow-sm", children: [
          /* @__PURE__ */ jsx(CardHeader, { className: "flex flex-row items-center justify-between", children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Hotel, { className: "h-5 w-5 text-emerald-500" }),
            " ",
            "Hotels Growth"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-[250px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
            AreaChart,
            {
              data: reportData,
              margin: {
                top: 5,
                right: 10,
                left: 0,
                bottom: 0
              },
              children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
                  "linearGradient",
                  {
                    id: "rh",
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
                    dataKey: "label",
                    tick: { fontSize: 11 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    tick: { fontSize: 11 },
                    allowDecimals: false
                  }
                ),
                /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
                /* @__PURE__ */ jsx(
                  Area,
                  {
                    type: "monotone",
                    dataKey: "hotels",
                    name: "Hotels",
                    stroke: "#10b981",
                    strokeWidth: 2,
                    fill: "url(#rh)"
                  }
                )
              ]
            }
          ) }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-3 border-none shadow-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Top Rated Hotels" }),
            /* @__PURE__ */ jsx(
              ExportButton,
              {
                onPDF: () => exportHotels("pdf"),
                onExcel: () => exportHotels("excel")
              }
            )
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "Hotel" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Rooms" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Reviews" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Rating" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: top_hotels.map((h) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsxs(TableCell, { className: "py-2", children: [
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: h.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                  h.city,
                  ", ",
                  h.country
                ] })
              ] }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: h.rooms_count }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-sm", children: h.reviews_count }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(
                Badge,
                {
                  variant: "secondary",
                  className: "font-bold",
                  children: [
                    /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" }),
                    h.reviews_avg_rating ? Number(
                      h.reviews_avg_rating
                    ).toFixed(1) : "—"
                  ]
                }
              ) })
            ] }, h.id)) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Users, { className: "h-5 w-5 text-blue-500" }),
              " User Registrations"
            ] }),
            /* @__PURE__ */ jsx(
              ExportButton,
              {
                onPDF: () => exportUsers("pdf"),
                onExcel: () => exportUsers("excel")
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("div", { className: "h-[200px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
              BarChart,
              {
                data: reportData,
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
                      dataKey: "label",
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
                      name: "Users",
                      fill: "#3b82f6",
                      radius: [4, 4, 0, 0]
                    }
                  )
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-3", children: "Latest Users" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: recent_users.slice(0, 5).map((u) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxs(Avatar, { className: "h-8 w-8", children: [
                      /* @__PURE__ */ jsx(AvatarImage, { src: u.avatar }),
                      /* @__PURE__ */ jsx(AvatarFallback, { className: "text-xs", children: u.name?.charAt(0) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate", children: u.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground truncate", children: u.email })
                    ] }),
                    /* @__PURE__ */ jsx(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-[10px] capitalize",
                        children: u.role
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
                      u.bookings_count,
                      " bookings"
                    ] })
                  ]
                },
                u.id
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Star, { className: "h-5 w-5 text-yellow-500" }),
              " ",
              "Reviews"
            ] }),
            /* @__PURE__ */ jsx(
              ExportButton,
              {
                onPDF: () => exportReviews("pdf"),
                onExcel: () => exportReviews("excel")
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("div", { className: "h-[200px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
              BarChart,
              {
                data: reportData,
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
                      dataKey: "label",
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
            /* @__PURE__ */ jsxs("div", { className: "mt-4 pt-4 border-t", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mb-3", children: "Latest Reviews" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: recent_reviews.slice(0, 5).map((r) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsx(
                      Star,
                      {
                        className: cn(
                          "h-3 w-3",
                          s <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                        )
                      },
                      s
                    )) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium truncate", children: r.hotel?.name }),
                      /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-muted-foreground truncate", children: [
                        "by ",
                        r.user?.name
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground", children: new Date(
                      r.created_at
                    ).toLocaleDateString() })
                  ]
                },
                r.id
              )) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsx(
          DonutChart,
          {
            data: booking_statuses,
            colors: BOOKING_STATUS_COLORS,
            title: "Booking Status"
          }
        ),
        /* @__PURE__ */ jsx(
          DonutChart,
          {
            data: payment_statuses,
            colors: PAYMENT_STATUS_COLORS,
            title: "Payment Status"
          }
        ),
        /* @__PURE__ */ jsx(
          DonutChart,
          {
            data: payment_methods,
            colors: PAYMENT_METHOD_COLORS,
            title: "Payment Methods"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-7", children: [
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-4 border-none shadow-sm", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(TrendingDown, { className: "h-5 w-5 text-rose-500" }),
            " ",
            "Cancellations"
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "h-[220px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
            LineChart,
            {
              data: reportData,
              margin: {
                top: 5,
                right: 10,
                left: 0,
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
                    dataKey: "label",
                    tick: { fontSize: 11 }
                  }
                ),
                /* @__PURE__ */ jsx(
                  YAxis,
                  {
                    tick: { fontSize: 11 },
                    allowDecimals: false
                  }
                ),
                /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, {}) }),
                /* @__PURE__ */ jsx(
                  Line,
                  {
                    type: "monotone",
                    dataKey: "cancelled",
                    name: "Cancelled",
                    stroke: "#ef4444",
                    strokeWidth: 2,
                    dot: { fill: "#ef4444", r: 3 }
                  }
                )
              ]
            }
          ) }) }) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "md:col-span-3 border-none shadow-sm", children: [
          /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
            /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-emerald-500" }),
              " ",
              "Top Payments"
            ] }),
            /* @__PURE__ */ jsx(
              ExportButton,
              {
                onPDF: () => exportPayments("pdf"),
                onExcel: () => exportPayments("excel")
              }
            )
          ] }),
          /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
            /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableHead, { children: "user" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Hotel" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Amount" }),
              /* @__PURE__ */ jsx(TableHead, { children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsx(TableBody, { children: top_payments.map((p) => /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: p.booking?.user?.name }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "text-xs", children: p.booking?.room?.hotel?.name }),
              /* @__PURE__ */ jsxs(TableCell, { className: "text-sm font-bold text-emerald-600", children: [
                "$",
                p.amount
              ] }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
                StatusBadge,
                {
                  status: p.status
                }
              ) })
            ] }, p.id)) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Index as default
};
