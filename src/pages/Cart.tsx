import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/store/cartSlice";
import type { Product } from "@/store/cartSlice";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (sum: number, item: Product & { quantity: number }) =>
      sum + item.price * (item.quantity || 1),
    0
  );

  const installmentOptions = [3, 6, 9, 12];

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center gap-4 text-gray-500">
          <p>Your cart is empty.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Continue Shopping →
          </Link>
        </div>
      ) : (
        <>
          {/* Installment Calculator */}
          <div className="mb-8 p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 border border-blue-100 dark:border-gray-700 shadow flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-300 tracking-tight">
              Installment Calculator
            </h2>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-200">
              Total Price:{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                ${totalPrice.toFixed(2)}
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {installmentOptions.map((months) => (
                <div
                  key={months}
                  className="flex flex-col items-center p-5 bg-white dark:bg-gray-800 rounded-xl border border-blue-100 dark:border-gray-700 shadow hover:shadow-lg transition-all"
                >
                  <span className="font-semibold text-blue-700 dark:text-blue-300 mb-1">
                    {months} months
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold text-xl mb-1">
                    ${(totalPrice / months).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-300">
                    per month
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 place-items-center">
            {cartItems.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Total Price & Clear Cart */}
          <div className="flex justify-end items-center gap-4 mb-4">
            <span className="font-bold text-xl text-blue-700">
              Total: ${totalPrice.toFixed(2)}
            </span>
            <Button
              variant="destructive"
              onClick={() =>
                window.confirm("Are you sure you want to clear your cart?")
                  ? dispatch(clearCart())
                  : null
              }
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
