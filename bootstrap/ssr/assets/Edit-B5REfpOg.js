import { jsxs, jsx } from "react/jsx-runtime";
import { D as DashboardLayout } from "./DashboardLayout-9DDnAS0D.js";
import { useForm, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-Dm9784FB.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent, e as CardFooter } from "./card-BY9Lq84_.js";
import { I as Input } from "./input-D6vmmPPF.js";
import { L as Label } from "./label-BrVZIReJ.js";
import { T as Textarea } from "./textarea-kC2BQjKr.js";
import { ChevronLeft } from "lucide-react";
import { I as ImageUploader } from "./ImageUploader-cmYRcRMT.js";
import "react";
import "./BackToTop-Cf3OnJBv.js";
import "@base-ui/react/avatar";
import "@base-ui/react/menu";
import "next-themes";
import "sonner";
import "@base-ui/react/scroll-area";
import "./badge-qMfuib1i.js";
import "@base-ui/react/merge-props";
import "@base-ui/react/use-render";
import "class-variance-authority";
import "./ThemeToggle-DzFfzEoP.js";
import "@base-ui/react/dialog";
import "./separator-CBwNKPLd.js";
import "@base-ui/react/separator";
import "@radix-ui/react-slot";
import "@base-ui/react/button";
import "clsx";
import "tailwind-merge";
import "@base-ui/react/input";
function Edit({ roomType, hotels }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: "PUT",
    hotel_id: roomType.hotel_id.toString(),
    name: roomType.name || "",
    description: roomType.description || "",
    max_users: roomType.max_users || 1,
    price_per_night: roomType.price_per_night || 0,
    existing_images: roomType.images || [],
    new_images: []
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("dashboard.room-types.update", roomType.uuid), {
      forceFormData: true
    });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Room Type - ${roomType.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.room-types.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Edit Room Type" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Room Type Details" }),
          /* @__PURE__ */ jsxs(CardDescription, { children: [
            "Update information for",
            " ",
            /* @__PURE__ */ jsx("strong", { children: roomType.name }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "hotel_id", children: "Hotel" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                id: "hotel_id",
                value: data.hotel_id,
                onChange: (e) => setData("hotel_id", e.target.value),
                className: "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                children: [
                  /* @__PURE__ */ jsx("option", { value: "", children: "Select a hotel" }),
                  hotels.map((hotel) => /* @__PURE__ */ jsx(
                    "option",
                    {
                      value: hotel.id.toString(),
                      children: hotel.name
                    },
                    hotel.id
                  ))
                ]
              }
            ),
            errors.hotel_id && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.hotel_id })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Room Type Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                placeholder: "e.g. Deluxe Double Sea View"
              }
            ),
            errors.name && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "description", children: "Description" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                id: "description",
                value: data.description,
                onChange: (e) => setData("description", e.target.value),
                placeholder: "Describe the room features, amenities, etc.",
                rows: 4
              }
            ),
            errors.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "max_users", children: "Max users" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "max_users",
                  type: "number",
                  min: "1",
                  value: data.max_users,
                  onChange: (e) => setData("max_users", e.target.value)
                }
              ),
              errors.max_users && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.max_users })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "price_per_night", children: "Price Per Night ($)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "price_per_night",
                  type: "number",
                  step: "0.01",
                  min: "0",
                  value: data.price_per_night,
                  onChange: (e) => setData(
                    "price_per_night",
                    e.target.value
                  )
                }
              ),
              errors.price_per_night && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.price_per_night })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            ImageUploader,
            {
              existingImages: data.existing_images,
              onExistingChange: (imgs) => setData("existing_images", imgs),
              newFiles: data.new_images,
              onFilesChange: (files) => setData("new_images", files),
              errors: errors.images || errors.new_images
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(CardFooter, { className: "flex justify-end gap-4 border-t px-6 py-4", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.room-types.index"), children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Update Room Type" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
