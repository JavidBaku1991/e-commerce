import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';

interface CarouselProps {
  products: Array<{
    id: number;
    title: string;
    image: string;
  }>;
}

const Carousel: React.FC<CarouselProps> = ({ products }) => {
  if (!products.length) return null;
  return (
    <div className="w-full flex flex-col items-center my-8">
      <h2 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-200">Featured products</h2>
      <Splide
        options={{
          type: 'loop',
          perPage: 3,
          arrows: true,
          pagination: true,
          autoplay: true,
          interval: 3500,
        }}
        className="w-full max-w-4xl mx-auto px-2 sm:px-4"
      >
        {products.map((product) => (
          <SplideSlide key={product.id}>
            <div className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-48 object-contain mb-2 rounded-lg shadow"
              />
              <div className="text-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                {product.title}
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;
