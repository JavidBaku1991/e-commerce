import React from "react";
import { FaShoppingCart, FaTrash, FaStar, FaRegStar } from "react-icons/fa";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";
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
    rating?: {
      rate: number;
      count: number;
    };
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
  const navigate = useNavigate();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    toast.success(`${product.title} removed from cart!`);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      className="group flex flex-col rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:scale-[1.03] w-60 min-h-[350px] p-3 m-3 overflow-hidden cursor-pointer bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg backdrop-saturate-150 relative"
      onClick={handleCardClick}
    >
      {/* Image */}
      <CardHeader className="flex items-center justify-center p-2">
        <div className="relative flex aspect-square w-28 items-center justify-center overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          {/* Floating Compare button */}
          <Button
            size="sm"
            variant="secondary"
            disabled={compareDisabled}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addToCompare(product));
            }}
            className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[11px] rounded-md px-2 py-1"
          >
            {inCompare
              ? "Added"
              : compareItems.length >= 3
              ? "Max 3"
              : "Compare"}
          </Button>
        </div>
      </CardHeader>

      {/* Info */}
      <CardContent className="flex flex-col text-center flex-grow px-2">
        <CardTitle className="text-sm font-semibold line-clamp-2 break-words group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {product.title}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500 dark:text-gray-400">
          {product.category}
        </CardDescription>
        <span className="font-bold text-blue-600 dark:text-blue-400 text-sm mt-1">
          ${product.price}
        </span>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center justify-center mt-1 mb-1">
            <span className="flex mr-1 text-yellow-500 text-sm transition-colors">
              {Array.from({ length: 5 }).map((_, i) =>
                i < Math.round(product.rating.rate) ? (
                  <FaStar key={i} />
                ) : (
                  <FaRegStar key={i} />
                )
              )}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              ({product.rating.rate})
            </span>
          </div>
        )}

        {inCart && cartItem?.quantity && (
          <span className="text-[12px] text-green-600 font-semibold">
            Total: ${(product.price * cartItem.quantity).toFixed(2)}
          </span>
        )}

        {/* Description */}
        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-3 mt-2 break-words group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {product.description}
        </p>
      </CardContent>

      {/* Cart Actions */}
      <CardFooter className="mt-auto w-full py-2 flex flex-col gap-1 items-center">
        {!inCart ? (
          <Button
            className="w-full rounded-lg text-xs hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            variant="default"
          >
            <FaShoppingCart /> Add to Cart
          </Button>
        ) : (
          <div className="flex gap-1 w-full items-center justify-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(decreaseQuantity(product.id));
              }}
              variant="outline"
              className="px-2 text-xs hover:bg-red-100 dark:hover:bg-red-800 transition"
            >
              -
            </Button>
            <span className="font-semibold text-xs">{cartItem?.quantity}</span>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(increaseQuantity(product.id));
              }}
              variant="outline"
              className="px-2 text-xs hover:bg-green-100 dark:hover:bg-green-800 transition"
            >
              +
            </Button>
            <Button
              className="rounded-sm text-xs hover:bg-red-500 hover:text-white transition-all flex items-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromCart();
              }}
              variant="destructive"
            >
              <FaTrash className="text-gray-700 dark:text-gray-200" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
