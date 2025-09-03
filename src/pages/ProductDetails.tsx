import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!product) return <div className="text-center py-8">Product not found.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8 bg-white dark:bg-gray-900 min-h-[60vh]">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img src={product.image} alt={product.title} className="h-48 w-48 object-contain" />
        <div>
          <h1 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-200">{product.title}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">{product.category}</p>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-xl mb-2">${product.price}</p>
          {product.rating && (
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-2">
                {'★'.repeat(Math.round(product.rating.rate))}
                {'☆'.repeat(5 - Math.round(product.rating.rate))}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({product.rating.rate} / 5, {product.rating.count} reviews)</span>
            </div>
          )}
          <p className="text-gray-700 dark:text-gray-200 mb-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
