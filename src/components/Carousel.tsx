import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { motion } from "framer-motion";

interface CarouselProps {
  products: Array<{
    id: number;
    title: string;
    image: string;
    price: number;
  }>;
}

const Carousel: React.FC<CarouselProps> = ({ products }) => {
  if (!products.length) return null;

  return (
    <div className="w-full flex flex-col items-center my-10">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 tracking-wide">
        ✨ Featured Products
      </h2>
      <Splide
        options={{
          type: "loop",
          perPage: 3,
          perMove: 1,
          gap: "1rem",
          arrows: true,
          pagination: true,
          autoplay: true,
          interval: 3500,
          breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
        className="w-full max-w-6xl mx-auto px-4"
      >
        {products.map((product) => (
          <SplideSlide key={product.id}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 transition-all duration-300 hover:shadow-2xl h-full"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-52 w-52 object-contain mb-4 rounded-xl"
              />
              <div className="text-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                {product.title}
              </div>
              <div className="text-center text-blue-600 dark:text-blue-400 font-bold text-md mt-1">
                ${product.price}
              </div>
              <button className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow hover:opacity-90 transition-all">
                View Details
              </button>
            </motion.div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;
