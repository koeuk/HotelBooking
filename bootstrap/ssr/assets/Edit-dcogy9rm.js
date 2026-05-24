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
function Edit({ hotel }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: "PUT",
    name: hotel.name || "",
    description: hotel.description || "",
    address: hotel.address || "",
    city: hotel.city || "",
    country: hotel.country || "",
    latitude: hotel.latitude || "",
    longitude: hotel.longitude || "",
    rating: hotel.rating || 0,
    existing_images: hotel.images || [],
    new_images: []
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("dashboard.hotels.update", hotel.uuid), { forceFormData: true });
  };
  return /* @__PURE__ */ jsxs(DashboardLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Edit Hotel - ${hotel.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.hotels.index"), children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Edit Hotel" })
      ] }),
      /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Hotel Details" }),
          /* @__PURE__ */ jsxs(CardDescription, { children: [
            "Update information for ",
            /* @__PURE__ */ jsx("strong", { children: hotel.name }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Hotel Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                placeholder: "e.g. Grand Plaza Hotel"
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
                placeholder: "Provide a detailed description of the hotel...",
                rows: 5
              }
            ),
            errors.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.description })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "address", children: "Address" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "address",
                  value: data.address,
                  onChange: (e) => setData("address", e.target.value),
                  placeholder: "123 Street Ave"
                }
              ),
              errors.address && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.address })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "rating", children: "Rating (0-5)" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "rating",
                  type: "number",
                  step: "0.1",
                  min: "0",
                  max: "5",
                  value: data.rating,
                  onChange: (e) => setData("rating", e.target.value)
                }
              ),
              errors.rating && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.rating })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "city", children: "City" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "city",
                  value: data.city,
                  onChange: (e) => setData("city", e.target.value),
                  placeholder: "City name"
                }
              ),
              errors.city && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.city })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "country", children: "Country" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "country",
                  value: data.country,
                  onChange: (e) => setData("country", e.target.value),
                  placeholder: "Country name"
                }
              ),
              errors.country && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.country })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "latitude", children: "Latitude" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "latitude",
                  type: "number",
                  step: "0.0000001",
                  value: data.latitude,
                  onChange: (e) => setData("latitude", e.target.value),
                  placeholder: "e.g. 13.3633"
                }
              ),
              errors.latitude && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.latitude })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "longitude", children: "Longitude" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "longitude",
                  type: "number",
                  step: "0.0000001",
                  value: data.longitude,
                  onChange: (e) => setData("longitude", e.target.value),
                  placeholder: "e.g. 103.8563"
                }
              ),
              errors.longitude && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: errors.longitude })
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
          /* @__PURE__ */ jsx(Button, { variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: route("dashboard.hotels.index"), children: "Cancel" }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", disabled: processing, children: processing ? "Saving..." : "Update Hotel" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Edit as default
};
