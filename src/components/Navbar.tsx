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
  const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
  return stored ?? 'light';
});

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
  <nav className="sticky top-0 z-50 left-0 w-full bg-white border-b shadow- dark:bg-gray-800 dark:border-gray-700">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-blue-700 tracking-tight">
            E-Shopperce
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 sm:gap-6 items-center">
          <Link to="/e-commerce" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/all-products" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">All Products</Link>
          <Link to="/cart" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Cart</Link>
          <Link to="/compare" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Compare</Link>
          <button
            onClick={toggleTheme}
            className="ml-4 px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-gray-800 dark:text-white"
            aria-label="Toggle light/dark mode"
          >
            {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>

  {/* Mobile Drawer + Theme Button */}
  <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            className="px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-gray-800 dark:text-white"
            aria-label="Toggle light/dark mode"
          >
            {theme === 'light' ? '🌞' : '🌙'}
          </button>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent className="bg-white dark:bg-gray-800 border dark:border-gray-700">
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-200">Menu</span>
                  <DrawerClose asChild>
                    <button aria-label="Close menu" className="text-2xl text-gray-700 dark:text-gray-200">×</button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <ul className="flex flex-col gap-4 mt-4">
                <li>
                  <DrawerClose asChild>
                    <Link to="/e-commerce" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                  </DrawerClose>
                </li>
                <li>
                  <DrawerClose asChild>
                    <Link to="/all-products" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Products</Link>
                  </DrawerClose>
                </li>
                <li>
                  <DrawerClose asChild>
                    <Link to="/cart" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cart</Link>
                  </DrawerClose>
                </li>
                <li>
                  <DrawerClose asChild>
                    <Link to="/compare" className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Compare</Link>
                  </DrawerClose>
                </li>
              </ul>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
