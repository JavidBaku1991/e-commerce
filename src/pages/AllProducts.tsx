import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaTag, FaFilter, FaStar } from "react-icons/fa";

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
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minRating, setMinRating] = useState<string>("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((product) => {
    const price = product.price;
    const rating = product.rating?.rate ?? 0;
    if (minPrice !== "" && price < Number(minPrice)) return false;
    if (maxPrice !== "" && price > Number(maxPrice)) return false;
    if (selectedCategory !== "" && product.category !== selectedCategory) return false;
    if (minRating !== "" && rating < Number(minRating)) return false; // ✅ changed to "at least"
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  return (
    <div className="mt-10 bg-white dark:bg-gray-900 min-h-[70vh]">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100 tracking-wide">
        🛒 All Products
      </h1>

      {/* Filters */}
      <div className="container mx-auto px-6 mb-10">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {/* Price */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition w-40">
            <label className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 mb-2">
              <FaTag /> Price
            </label>
            <input
              type="number"
              min={0}
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full mb-2 border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
            />
            <input
              type="number"
              min={0}
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Category */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition w-52">
            <label className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 mb-2">
              <FaFilter /> Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition w-40">
            <label className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 mb-2">
              <FaStar className="text-yellow-500" /> Min Rating
            </label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              className="w-full border rounded px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
              placeholder="e.g. 4.5"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-6">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center"
        >
          {loading ? (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-300">
              Loading products...
            </div>
          ) : paginatedProducts.length ? (
            paginatedProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 dark:text-gray-300">
              No products match your filters 😢
            </div>
          )}
        </motion.div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
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
              className={`transition ${
                page === i + 1 ? "bg-blue-600 text-white" : ""
              }`}
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
      )}
    </div>
  );
};

export default AllProducts;
