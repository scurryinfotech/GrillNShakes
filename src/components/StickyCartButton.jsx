// src/components/StickyCartButton.jsx
import React from 'react';

const StickyCartButton = ({ onClick, itemCount }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t shadow-md flex justify-between items-center">
    <div>
      <p className="text-sm font-medium">Items: {itemCount}</p>
    </div>
    <button type="button" onClick={onClick} className=" bg-green-500 text-white px-4 py-2 rounded">
      View Cart
    </button>
  </div>
);

export default StickyCartButton;