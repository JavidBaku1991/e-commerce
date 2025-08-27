import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "@/store/cartSlice";
import { addToCompare } from "@/store/compareSlice";
import type { RootState } from "@/store";
import type { Product } from "@/store/cartSlice";

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

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item: Product) => item.id === product.id)
  );
  const inCart = !!cartItem;
  const compareItems = useSelector((state: RootState) => state.compare.items);
  const inCompare = compareItems.some((item: Product) => item.id === product.id);
  const compareDisabled = inCompare || compareItems.length >= 3;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <Card className="group flex flex-col rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02] w-56 min-h-[320px] p-2 m-2 overflow-hidden">
      {/* Image */}
      <CardHeader className="flex items-center justify-center p-2">
        <div className="flex aspect-square w-24 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>

      {/* Info */}
      <CardContent className="flex flex-col text-center flex-grow px-2">
        <CardTitle className="text-sm font-semibold line-clamp-2 break-words">
          {product.title}
        </CardTitle>
        <CardDescription className="text-xs text-gray-400">
          {product.category}
        </CardDescription>
        <span className="font-bold text-blue-600 text-sm mt-1">
          ${product.price}
        </span>
        {inCart && cartItem?.quantity && (
          <span className="text-[11px] text-green-600 font-semibold">
            Total: ${(product.price * cartItem.quantity).toFixed(2)}
          </span>
        )}

        {/* Compare Button */}
        <Button
          className="rounded-lg w-full text-xs mt-2"
          onClick={() => dispatch(addToCompare(product))}
          variant="secondary"
          disabled={compareDisabled}
        >
          {inCompare
            ? "Added to Compare"
            : compareItems.length >= 3
            ? "Max 3 Products"
            : "Compare"}
        </Button>

        {/* Description */}
        <p className="text-[11px] text-gray-500 line-clamp-3 mt-2 break-words">
          {product.description}
        </p>
      </CardContent>

      {/* Cart Actions */}
      <CardFooter className="mt-auto w-full py-2 flex flex-col gap-1 items-center">
        {!inCart ? (
          <Button
            className="w-full rounded-lg text-xs"
            onClick={handleAddToCart}
            variant="default"
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex gap-1 w-full items-center justify-center">
            <Button
              onClick={() => dispatch(decreaseQuantity(product.id))}
              variant="outline"
              className="px-2 text-xs"
            >
              -1
            </Button>
            <span className="font-semibold text-xs">{cartItem?.quantity}</span>
            <Button
              onClick={() => dispatch(increaseQuantity(product.id))}
              variant="outline"
              className="px-2 text-xs"
            >
              +1
            </Button>
            <Button
              className="rounded-sm text-xs"
              onClick={handleRemoveFromCart}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
