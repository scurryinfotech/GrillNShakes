import React from 'react';
import { ShoppingCart } from 'lucide-react';

const Header = ({ getCartItemCount, setShowCart }) => (
  <header className=" sticky top-0 bg-white z-50 bg-gradient-to-r from-teal-600 to-teal-700 text-white p-3 sm:p-4 shadow-lg ">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Grill N Shakes</h1>
      <button
        onClick={() => setShowCart(true)}
        className="relative bg-white text-teal-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base shadow-md"
      >
        
        <ShoppingCart size={16} className="sm:w-5 sm:h-5"/>
        <span className="hidden sm:inline">Cart</span>
        {getCartItemCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
            {getCartItemCount()}
          </span>
        )}
      </button>
    </div>  
  </header>
);

export default Header;