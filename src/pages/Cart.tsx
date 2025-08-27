import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/store/cartSlice";
import type { Product } from "@/store/cartSlice";

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((sum: number, item: Product & { quantity: number }) => sum + item.price * (item.quantity || 1), 0);

  const installmentOptions = [3, 6, 9, 12];

  return (
  <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">Your cart is empty.</div>
      ) : (
        <>
          <div className="mb-8 p-4 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-3 text-blue-700 tracking-tight">Installment Calculator</h2>
            <p className="mb-6 text-lg text-gray-700">Total Price: <span className="font-bold text-blue-600">${totalPrice.toFixed(2)}</span></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {installmentOptions.map(months => (
                <div key={months} className="flex flex-col items-center p-5 bg-white rounded-xl border border-blue-100 shadow hover:shadow-lg transition-all">
                  <span className="font-semibold text-blue-700 mb-1">{months} months</span>
                  <span className="text-blue-600 font-extrabold text-xl mb-1">${(totalPrice / months).toFixed(2)}</span>
                  <span className="text-xs text-gray-400">per month</span>
                </div>
              ))}
            </div>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {cartItems.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {/* Total Price */}
          <div className="flex justify-end items-center gap-4 mb-4">
            <span className="font-bold text-xl text-blue-700">Total: ${totalPrice.toFixed(2)}</span>
            <Button variant="destructive" onClick={() => dispatch(clearCart())}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
