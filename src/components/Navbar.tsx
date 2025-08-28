
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="relative top-0 left-0 w-full bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-blue-700 tracking-tight">E-Shopperce</span>
        </div>
        <div className="flex gap-2 sm:gap-4 ml-auto flex-wrap">
          <Link to="/e-commerce" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/all-products" className="font-medium text-gray-700 hover:text-blue-600 transition-colors">All Products</Link>
          <Link to="/cart" className="relative font-medium text-gray-700 hover:text-blue-600 transition-colors">Cart</Link>
          <Link to="/compare" className="relative font-medium text-gray-700 hover:text-blue-600 transition-colors">Compare</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
