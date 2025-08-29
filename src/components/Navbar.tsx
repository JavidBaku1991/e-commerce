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

  return (
    <nav className="relative top-0 left-0 w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-blue-700 tracking-tight">
            E-Shopperce
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 sm:gap-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/all-products" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">All Products</Link>
          <Link to="/cart" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Cart</Link>
          <Link to="/compare" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Compare</Link>
        </div>

        {/* Mobile Drawer */}
        <div className="md:hidden">
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

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
              <DrawerHeader>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">Menu</span>
                  <DrawerClose asChild>
                    <button aria-label="Close menu" className="text-2xl">×</button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <ul className="flex flex-col gap-4 mt-4">
                <li>
                  <DrawerClose asChild>
                    <Link to="/">Home</Link>
                  </DrawerClose>
                </li>
                <li>
                  <DrawerClose asChild>
                    <Link to="/all-products">All Products</Link>
                  </DrawerClose>
                </li>
                <li>
                  <DrawerClose asChild>
                    <Link to="/cart">Cart</Link>
                  </DrawerClose>
                </li>
                <li>
                  <DrawerClose asChild>
                    <Link to="/compare">Compare</Link>
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
