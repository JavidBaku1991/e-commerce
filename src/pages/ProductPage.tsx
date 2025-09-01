import { useNavigate } from "react-router-dom";

// Dummy product data
const products = [
  { id: 1, name: "Product 1", price: "$10", image: "/vite.svg" },
  { id: 2, name: "Product 2", price: "$20", image: "/vite.svg" },
  { id: 3, name: "Product 3", price: "$30", image: "/vite.svg" },
];

const ProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-8 bg-white dark:bg-gray-900 min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-6 text-gray-700 dark:text-gray-200">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.image} alt={product.name} className="h-32 w-32 object-contain mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-blue-600 dark:text-blue-400 font-bold">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
