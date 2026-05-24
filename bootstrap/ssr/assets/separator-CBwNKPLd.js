import { jsx } from "react/jsx-runtime";
import { Separator as Separator$1 } from "@base-ui/react/separator";
import { c as cn } from "./button-Dm9784FB.js";
function Separator({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Separator$1,
    {
      "data-slot": "separator",
      orientation,
      className: cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      ),
      ...props
    }
  );
}
export {
  Separator as S
};
