import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const PRODUCTS_PER_PAGE = 12;

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product =>
    product.price >= minPrice &&
    product.price <= maxPrice &&
    (selectedCategory === '' || product.category === selectedCategory) &&
    (product.rating?.rate ?? 0) >= minRating
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="mt-8 bg-white dark:bg-gray-900 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200">All Products</h1>

      {/* Filters */}
      <div className="container mx-auto px-4 mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-xs mb-1 text-gray-700 dark:text-gray-200">Min Price</label>
          <input type="number" min={0} value={minPrice} onChange={e => setMinPrice(Number(e.target.value))} className="border rounded px-2 py-1 w-24 dark:bg-gray-800 dark:text-gray-200" />
        </div>
        <div>
          <label className="block text-xs mb-1 text-gray-700 dark:text-gray-200">Max Price</label>
          <input type="number" min={0} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="border rounded px-2 py-1 w-24 dark:bg-gray-800 dark:text-gray-200" />
        </div>
        <div>
          <label className="block text-xs mb-1 text-gray-700 dark:text-gray-200">Category</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border rounded px-2 py-1 dark:bg-gray-800 dark:text-gray-200">
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1 text-gray-700 dark:text-gray-200">Min Rating</label>
          <input type="number" min={0} max={5} step={0.1} value={minRating} onChange={e => setMinRating(Number(e.target.value))} className="border rounded px-2 py-1 w-24 dark:bg-gray-800 dark:text-gray-200" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8  ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {loading ? (
            <div className="col-span-full text-center text-gray-700 dark:text-gray-200">Loading products...</div>
          ) : (
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={page === i + 1 ? "default" : "outline"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllProducts;
