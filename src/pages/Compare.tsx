import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { removeFromCompare, clearCompare } from "@/store/compareSlice";
import { Button } from "@/components/ui/button";
import type { Product } from "@/store/cartSlice";

const Compare: React.FC = () => {
  const compareItems = useSelector((state: RootState) => state.compare.items);
  const dispatch = useDispatch();

  return (
  <div className="container mx-auto px-4 mt-8">
      <h1 className="text-2xl font-bold mb-6">Compare Products</h1>
      {compareItems.length === 0 ? (
        <div className="text-center text-gray-500">No products selected for comparison.</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-8 mb-8 justify-center items-stretch">
            {compareItems.map((product: Product) => (
              <div key={product.id} className="flex-1 min-w-[250px] min-w-0 min-h-[320px] p-4 sm:p-6 rounded-xl border shadow bg-white flex flex-col gap-2 items-center justify-between">
                <div className="flex items-center justify-center mb-4">
                  <img src={product.image} alt={product.title} className="h-24 w-24 object-contain" />
                </div>
                <h2 className="font-bold text-lg text-blue-700 mb-1">{product.title}</h2>
                <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
                <p className="text-sm text-gray-500 mb-1">Price: <span className="font-semibold text-blue-600">${product.price}</span></p>
                <p className="text-sm text-gray-500 mb-1">Description: {product.description}</p>
                <div className="flex flex-col gap-2 w-full mt-auto">
                  <Button variant="destructive" onClick={() => dispatch(removeFromCompare(product.id))}>
                    Remove from Compare
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 color-red">
            <Button 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={() => dispatch(clearCompare())}
            >
              Clear Compare
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Compare;
