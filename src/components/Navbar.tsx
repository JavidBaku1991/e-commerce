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
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-white shadow">
      <div className="text-xl font-bold">E-Commerce</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all-products">Products</Link></li>
        <li><Link to="/compare">Compare</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>

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
                  <Link to="/all-products">Products</Link>
                </DrawerClose>
              </li>
              <li>
                <DrawerClose asChild>
                  <Link to="/compare">Compare</Link>
                </DrawerClose>
              </li>
              <li>
                <DrawerClose asChild>
                  <Link to="/cart">Cart</Link>
                </DrawerClose>
              </li>
            </ul>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
