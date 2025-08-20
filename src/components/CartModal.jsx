import React from "react";
import { Plus, Minus, Trash2, MapPin } from "lucide-react";

const CartModal = ({
  cart,
  updateCartQuantity,
  removeFromCart,
  handlePlaceOrder,
  selectedTable,
  setShowCart,
}) => (
  <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] sm:max-h-[80vh] overflow-y-auto shadow-xl">
      <div className="p-3 sm:p-4 border-b bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold">Your Cart</h2>
          <button
            onClick={() => setShowCart(false)}
            className="text-white hover:text-gray-200 text-xl sm:text-2xl"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm sm:text-base">
            Your cart is empty
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b gap-3 hover:bg-gray-50 px-2 rounded"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm sm:text-base truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 capitalize">
                    {item.size}{" Portion"}
                  </p>{" "}
                  {/*- ₹{item.price*/}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center font-semibold text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateCartQuantity(item.id, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 ">
              <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-700">
                  <MapPin size={16} />
                  <span className="text-sm sm:text-base font-semibold">
                    Table: {selectedTable || "Not Selected"}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!selectedTable} // ✅ Disable button if no table
                className={`w-full py-3 rounded-lg font-semibold text-sm sm:text-base shadow-md transition-all duration-200 
    ${
      selectedTable
        ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-teal-700 hover:to-teal-800"
        : "bg-gray-300 text-gray-600 cursor-not-allowed"
    }`}
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

export default CartModal;
