import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 mb-6 bg-white dark:bg-gray-900 min-h-[60vh]">
        <Hero />
        {/* Center products horizontally on mobile */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {loading ? (
              <div className="col-span-full text-center text-gray-700 dark:text-gray-200">
                Məhsullar yüklənir...
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
        {/* Carousel below products */}
        {!loading && products.length > 0 && (
          <Carousel products={products.slice(0, 5).map(p => ({ id: p.id, title: p.title, image: p.image }))} />
        )}
      </div>
    </>
  );
};

export default Home;
