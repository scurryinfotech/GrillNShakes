//src/components/CategorySection.jsx
import React from 'react';
import MenuItem from './MenuItems';

const CategorySection = ({
  categoryName,
  subcategories,
  expanded,
  toggleCategory,
  addToCart,
  getItemQuantityInCart,
  updateCartQuantity
}) => (

  <div className="px-4">
    <button
  onClick={() => {
    console.log("Category clicked:", categoryName);
    toggleCategory(categoryName);
  }}
  className="text-lg  font-semibold mt-4 mb-2 text-black bg-gray-100 px-4 py-2 rounded shadow w-full text-left cursor-pointer"
>
  {categoryName} {expanded ? '▲' : '▼'}
</button>

    

   {expanded && Object.entries(subcategories ?? {}).map(
([subName, items]) => (
  <div key={subName} className="mb-4">
    <h3 className="text-md font-medium mb-2">{subName}</h3>
    <div className="space-y-4">
      {items.map((item, index) => (
        <MenuItem
          key={`${item?.id ?? index}-${subName}`}
          item={item}
          subcategoryName={subName}
          getItemQuantityInCart={getItemQuantityInCart}
          addToCart={addToCart}
          updateCartQuantity={updateCartQuantity}
          
        />
      ))}
    </div>
  </div>
))}

  </div>
);

export default CategorySection;
