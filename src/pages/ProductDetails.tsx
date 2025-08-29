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
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img src={product.image} alt={product.title} className="h-48 w-48 object-contain" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-blue-600 font-bold text-xl mb-4">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
