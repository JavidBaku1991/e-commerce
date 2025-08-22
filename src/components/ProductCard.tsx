import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };
}

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from "@/store/cartSlice";
import { addToCompare, removeFromCompare } from "@/store/compareSlice";
import type { RootState } from "@/store";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.cart.items.find(item => item.id === product.id));
  const inCart = !!cartItem;
  const compareItems = useSelector((state: RootState) => state.compare.items);
  const inCompare = compareItems.some(item => item.id === product.id);
  const compareDisabled = inCompare || compareItems.length >= 3;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
  <Card className="group flex flex-col rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] w-56 min-h-[280px] p-1 m-2">
      <CardHeader className="flex items-center justify-center p-1">
        <div className="aspect-square w-20 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>

  <CardContent className="flex flex-col items-center text-center px-2">
  <h2 className="font-semibold text-base line-clamp-2">{product.title}</h2>
        <p className="text-xs text-gray-400 mb-1">{product.category}</p>
  <p className="font-bold text-blue-600 text-base">${product.price}</p>
        {inCart && cartItem?.quantity && (
          <p className="text-xs text-green-600 font-semibold mt-1">Total: ${(product.price * cartItem.quantity).toFixed(2)}</p>
        )}
  <p className="text-xs text-gray-500 line-clamp-3 mt-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="mt-auto w-full py-1 pb-2 flex flex-col gap-1 items-center justify-center">
        <Button
          className="rounded-xl w-full text-xs"
          onClick={() => dispatch(addToCompare(product))}
          variant="secondary"
          disabled={compareDisabled}
        >
          {inCompare ? "Added to Compare" : compareItems.length >= 3 ? "Max 3 Products" : "Compare"}
        </Button>
        {!inCart ? (
          <Button className="w-full rounded-xl text-xs" onClick={handleAddToCart} variant="default">
            Add to Cart
          </Button>
        ) : (
          <div className="flex gap-1 w-full items-center justify-center">
            <Button onClick={() => dispatch(decreaseQuantity(product.id))} variant="outline" className="px-2 text-xs">-1</Button>
            <span className="font-semibold text-xs">{cartItem?.quantity}</span>
            <Button onClick={() => dispatch(increaseQuantity(product.id))} variant="outline" className="px-2 text-xs">+1</Button>
            <Button className="rounded-sm text-xs" onClick={handleRemoveFromCart} variant="destructive">
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
