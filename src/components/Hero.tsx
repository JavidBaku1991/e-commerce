import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import saleImg from "../images/sale.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-[500px] flex items-center justify-center  overflow-hidden rounded-2xl shadow-xl mb-8 "
    >
      {/* Background Image */}
      <img
        src={saleImg}
        alt="Sale banner"
        className="absolute inset-0 w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700 ease-in-out"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl animate-fadeIn">
          Big Sale! <span className="text-blue-400">Discover</span> Amazing Products
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Shop now and enjoy exclusive discounts on our top collections.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate("/all-products")}
        >
          Browse All Products
        </Button>
      </div>
    </div>
  );
}

export default Hero;
