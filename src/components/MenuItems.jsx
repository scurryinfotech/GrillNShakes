import React from 'react';
import { Plus, Minus } from 'lucide-react';


const MenuItem = ({ item, subcategoryName, getItemQuantityInCart, addToCart, updateCartQuantity }) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow bg-gray-50">

      {/* ✅ Image Left Side */}
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shadow-md">
        {item.imageData ? (
          <img
            src={`data:image/jpeg;base64,${item.imageData}`}
            alt={item.name}
            className="w-full h-full  object-cover"
          />
        ) : (
          <span className="text-2xl">🍽️</span>
        )}
      </div>

      {/* ✅ Right Side Content */}
      <div className="flex flex-col-2 gap-3 sm:gap-6 md:gap-8  flex-grow ">

        {/* Item Name & Subcategory */}
        <div className="mb-3 flex-col flex">
          <h3 className="text-sm font-semibold text-gray-800 ">{item.name}</h3>
          <p className="text-xs text-gray-500 uppercase">{subcategoryName}</p>
        </div>

        {/* Prices & Add to Cart buttons */}
        <div className="pl-5 flex flex-wrap gap-2">
          {Object.entries(item.prices)
            .map(([key, value]) => [key.toLowerCase(), value])
            .filter(([, price]) => price > 0)
            .map(([size, price]) => {
              const quantity = getItemQuantityInCart(item.id, size);
              return (
                //set width
                <div key={size} className="h-12  mt-2 flex items-center justify-between border border-gray-300 rounded-md px-2 py-1 w-32 bg-white shadow-sm">
                  <span className=" text-xs font-medium ">{size} - ₹{price}</span>

                  <div className="flex items-center gap-1">  
                    {quantity > 0 && (
                      <button
                        onClick={() => updateCartQuantity(`${item.id}-${size}`, quantity - 1)}
                        className="bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow"
                      >
                        <Minus size={14} />
                      </button>
                    )}

                    {quantity > 0 && (
                      <span className="text-xs font-bold text-gray-800">{quantity}</span>
                    )}

                    <button
                      onClick={() => addToCart(item, size)}
                      className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

      </div>
    </div>
  );
};

export default MenuItem;
