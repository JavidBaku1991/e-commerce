import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

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
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
<div className="grid grid-cols-4 gap-6 mt-8">
  {loading ? (
    <div className="col-span-4 text-center">Loading products...</div>
  ) : (
    products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))
  )}
</div>

  );
};

export default Home;
