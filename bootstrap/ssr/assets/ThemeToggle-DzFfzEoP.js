import { jsxs, jsx } from "react/jsx-runtime";
import { Sun, Moon } from "lucide-react";
import { B as Button } from "./button-Dm9784FB.js";
import { useContext, createContext } from "react";
const ThemeContext = createContext({ theme: "light", setTheme: () => {
} });
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
      className: "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
      children: [
        /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }),
        /* @__PURE__ */ jsx(Moon, { className: "absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
      ]
    }
  );
}
export {
  ThemeToggle as T
};
