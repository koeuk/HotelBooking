import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-BbquYNfF.js";
import { B as Button, c as cn } from "./button-Dm9784FB.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { D as Dialog, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter } from "./dialog-zbygvPRX.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjoqtalQ.js";
import { B as Badge } from "./badge-qMfuib1i.js";
import { C as Card, c as CardContent } from "./card-BY9Lq84_.js";
import { Plus, Search, X, Eye, Edit, Trash2, Bed, AlertTriangle, Wrench, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "@base-ui/react/scroll-area";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
import "@base-ui/react/select";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
const statusConfig = {
  available: { label: "Available", icon: CheckCircle, class: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" },
  booked: { label: "Booked", icon: Clock, class: "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400" },
  maintenance: { label: "Maintenance", icon: Wrench, class: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400" }
};
const getStatusBadge = (status) => {
  const config = statusConfig[status];
  if (!config) return /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: status });
  const Icon = config.icon;
  return /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: cn("font-medium rounded-full", config.class), children: [
    /* @__PURE__ */ jsx(Icon, { className: "h-3 w-3 mr-1" }),
    config.label
  ] });
};
function Index({ rooms, hotels = [], filters = {}, counts = {} }) {
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [search, setSearch] = useState(filters.search || "");
  const { delete: destroy, processing } = useForm();
  const handleDelete = () => {
    destroy(route("dashboard.rooms.destroy", roomToDelete.uuid), {
      onSuccess: () => {
        setRoomToDelete(null);
        toast.success("Room deleted successfully");
      },
      onError: () => toast.error("Failed to delete room")
    });
  };
  const applyFilters = (newFilters) => {
    router.get(route("dashboard.rooms.index"), { ...filters, ...newFilters }, { preserveState: true });
  };
  const statusTabs = [
    { label: "All", value: "", count: counts.all },
    { label: "Available", value: "available", count: counts.available, color: "text-emerald-500" },
    { label: "Booked", value: "booked", count: counts.booked, color: "text-blue-500" },
    { label: "Maintenance", value: "maintenance", count: counts.maintenance, color: "text-amber-500" }
  ];
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Rooms Management" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Rooms" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Manage individual rooms, their floors and status." })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxs(Link, { href: route("dashboard.rooms.create"), children: [
          /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " Add Room"
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 flex-wrap", children: statusTabs.map((tab) => /* @__PURE__ */ jsxs(
        Button,
        {
          variant: (filters.status || "") === tab.value ? "default" : "outline",
          size: "sm",
          className: "rounded-full",
          onClick: () => applyFilters({ status: tab.value || void 0, page: 1 }),
          children: [
            /* @__PURE__ */ jsx("span", { className: cn((filters.status || "") !== tab.value && tab.color), children: tab.label }),
            /* @__PURE__ */ jsx("span", { className: cn(
              "ml-2 text-xs px-1.5 py-0.5 rounded-full",
              (filters.status || "") === tab.value ? "bg-white/20" : "bg-muted"
            ), children: tab.count })
          ]
        },
        tab.value
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "Search room number...",
              className: "pl-10",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter") applyFilters({ search, page: 1 });
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: filters.hotel || "all",
            onValueChange: (v) => applyFilters({ hotel: v === "all" ? void 0 : v, page: 1 }),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[200px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "All Hotels" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All Hotels" }),
                hotels.map((h) => /* @__PURE__ */ jsx(SelectItem, { value: String(h.id), children: h.name }, h.id))
              ] })
            ]
          }
        ),
        (filters.search || filters.hotel || filters.status) && /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
          setSearch("");
          router.get(route("dashboard.rooms.index"));
        }, children: [
          /* @__PURE__ */ jsx(X, { className: "mr-1 h-4 w-4" }),
          " Clear"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "bg-muted/30", children: [
          /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Room #" }),
          /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Hotel" }),
          /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Type" }),
          /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Floor" }),
          /* @__PURE__ */ jsx(TableHead, { className: "font-bold", children: "Status" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right font-bold", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          rooms.data.map((room) => /* @__PURE__ */ jsxs(TableRow, { className: "hover:bg-muted/20 transition-colors", children: [
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("span", { className: "font-bold text-sm bg-muted px-2.5 py-1 rounded-full", children: [
              "#",
              room.room_number
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: room.hotel.name }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: room.room_type.name }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
              "Floor ",
              room.floor || "-"
            ] }) }),
            /* @__PURE__ */ jsx(TableCell, { children: getStatusBadge(room.status) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.rooms.show", room.uuid), children: /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.rooms.edit", room.uuid), children: /* @__PURE__ */ jsx(Edit, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-destructive hover:text-destructive",
                  onClick: () => setRoomToDelete(room),
                  children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }) })
          ] }, room.id)),
          rooms.data.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsxs(TableCell, { colSpan: 6, className: "text-center py-12", children: [
            /* @__PURE__ */ jsx(Bed, { className: "h-10 w-10 text-muted-foreground/30 mx-auto mb-3" }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No rooms found." })
          ] }) })
        ] })
      ] }) }) }),
      rooms.links.length > 3 && /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end space-x-2", children: rooms.links.map((link, i) => /* @__PURE__ */ jsx(
        Button,
        {
          variant: link.active ? "default" : "outline",
          size: "sm",
          asChild: !!link.url,
          disabled: !link.url,
          className: !link.url ? "opacity-50" : "",
          children: link.url ? /* @__PURE__ */ jsx(Link, { href: link.url, dangerouslySetInnerHTML: { __html: link.label } }) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: link.label } })
        },
        i
      )) })
    ] }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        open: !!roomToDelete,
        onOpenChange: (open) => {
          if (!open) setRoomToDelete(null);
        },
        children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
          /* @__PURE__ */ jsxs(DialogHeader, { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "h-7 w-7 text-red-600 dark:text-red-400" }) }),
            /* @__PURE__ */ jsx(DialogTitle, { className: "text-center", children: "Delete Room" }),
            /* @__PURE__ */ jsx(DialogDescription, { className: "text-center", children: "This action cannot be undone. This will permanently delete this room and all associated bookings." })
          ] }),
          roomToDelete && /* @__PURE__ */ jsxs("div", { className: "rounded-lg border bg-muted/50 p-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Room number" }),
              /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
                "#",
                roomToDelete.room_number
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Hotel" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: roomToDelete.hotel.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Type" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: roomToDelete.room_type.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Floor" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: roomToDelete.floor || "-" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsx("span", { className: "font-medium capitalize", children: roomToDelete.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(DialogFooter, { className: "flex gap-2 sm:gap-0", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "outline",
                className: "flex-1",
                onClick: () => setRoomToDelete(null),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "destructive",
                className: "flex-1",
                onClick: handleDelete,
                disabled: processing,
                children: processing ? "Deleting..." : "Delete Room"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  Index as default
};
