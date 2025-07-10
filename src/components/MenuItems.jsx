import React from 'react';
import { Plus, Minus } from 'lucide-react';

const MenuItem = ({ item, subcategoryName, getItemQuantityInCart, addToCart, updateCartQuantity }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-gray-50">
    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-0">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
        <span className="text-xl sm:text-2xl">🍽️</span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">{subcategoryName}</p>
      </div>
    </div>

    <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
      {Object.entries(item.prices).map(([size, price]) => {
        const quantity = getItemQuantityInCart(item.id, size);

        return (
          <div key={size} className="flex flex-col items-center bg-white p-2 rounded-lg shadow-sm border">
            <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">{size} - ₹{price}</div>
            <div className="flex items-center gap-2">
              {quantity > 0 && (
                <button
                  onClick={() => updateCartQuantity(`${item.id}-${size}`, quantity - 1)}
                  className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                >
                  <Minus size={16} />
                </button>
              )}
              {quantity > 0 && (
                <span className="w-8 text-center font-bold text-gray-800">{quantity}</span>
              )}
              <button
                onClick={() => addToCart(item, size)}
                className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default MenuItem;
