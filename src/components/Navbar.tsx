import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "./ui/drawer";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("theme")
        : null;
    return stored ?? "light";
  });

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 left-0 w-full border-b shadow-md backdrop-blur-md bg-white/80 dark:bg-gray-900/80 dark:border-gray-700 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/vite.svg"
            alt="Logo"
            className="h-9 w-9 drop-shadow-lg hover:scale-110 transition-transform duration-300"
          />
          <span className="font-extrabold text-xl text-blue-700 dark:text-blue-400 tracking-tight">
            E-Shopperce
          </span>
        </div>

        {/* Desktop  */}
        <div className="hidden md:flex gap-6 items-center">
          {[
            { name: "Home", path: "/e-commerce" },
            { name: "All Products", path: "/all-products" },
            { name: "Cart", path: "/cart" },
            { name: "Compare", path: "/compare" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative font-medium text-gray-700 dark:text-gray-200 transition-colors
              after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400 
              hover:after:w-full after:transition-all after:duration-300"
            >
              {item.name}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-white flex items-center gap-2 hover:shadow-md transition-all"
            aria-label="Toggle light/dark mode"
          >
            <span
              className={`transition-transform duration-500 ${
                theme === "light" ? "rotate-0" : "rotate-180"
              }`}
            >
              {theme === "light" ? "🌞" : "🌙"}
            </span>
            <span className="hidden sm:inline text-sm">
              {theme === "light" ? "Light" : "Dark"}
            </span>
          </button>
        </div>

        {/* Mobile  */}
        <div className="md:hidden flex items-center gap-3">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:text-white hover:shadow-md transition"
            aria-label="Toggle light/dark mode"
          >
            {theme === "light" ? "🌞" : "🌙"}
          </button>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="bg-white dark:bg-gray-900 border-t dark:border-gray-700 rounded-t-2xl shadow-2xl animate-slideUp">
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-200">
                    Menu
                  </span>
                  <DrawerClose asChild>
                    <button
                      aria-label="Close menu"
                      className="text-2xl text-gray-700 dark:text-gray-200 hover:scale-110 transition"
                    >
                      ×
                    </button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <ul className="flex flex-col gap-5 mt-6 px-4">
                {[
                  { name: "Home", path: "/e-commerce" },
                  { name: "All Products", path: "/all-products" },
                  { name: "Cart", path: "/cart" },
                  { name: "Compare", path: "/compare" },
                ].map((item) => (
                  <li key={item.name}>
                    <DrawerClose asChild>
                      <Link
                        to={item.path}
                        className="block font-medium text-lg text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      >
                        {item.name}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
