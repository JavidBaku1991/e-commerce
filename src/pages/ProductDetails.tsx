import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { addToCompare } from "@/store/compareSlice";
import { toast } from "@/lib/toast";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          <div className="bg-gray-200 dark:bg-gray-700 h-60 w-60 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-8">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="overflow-hidden rounded-xl border bg-gray-50 dark:bg-gray-800">
            <img
              src={product.image}
              alt={product.title}
              className="h-72 w-72 object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h1
            className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-gray-100 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={() => navigate("/e-commerce")}
            title="Go to Home"
          >
            {product.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">
            {product.category}
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-extrabold text-2xl mb-4">
            ${product.price}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-2 text-lg">
                {"★".repeat(Math.round(product.rating.rate))}
                {"☆".repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.rating.rate} / 5, {product.rating.count} reviews)
              </span>
            </div>
          )}

          <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-auto">
            <Button
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
              onClick={() => {
                dispatch(addToCart(product));
                toast.success(`${product.title} added to cart!`);
              }}
            >
              🛒 Add to Cart
            </Button>
            <Button
              variant="secondary"
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
              onClick={() => {
                dispatch(addToCompare(product));
                toast.success(`${product.title} added to compare!`);
              }}
            >
              📊 Compare
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
