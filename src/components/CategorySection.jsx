import React from "react";
import MenuItem from "./MenuItems";

const CategorySection = ({
  categoryId,
  categoryName,
  subcategories,
  expanded,
  toggleCategory,
  addToCart,
  getItemQuantityInCart,
  updateCartQuantity,
  searchterm,
}) => (
  <div
    id={`menu-category-${categoryId}`}
    className="mb-1 scroll-mt-28"
  >
    <button
      onClick={() => toggleCategory(categoryId)}
      className="text-lg font-semibold mt-3 mb-2 text-black bg-gray-100 px-4 py-2 rounded shadow w-full text-left cursor-pointer"
    >
      {categoryName} {expanded ? "▲" : "▼"}
    </button>

    {(expanded || !!searchterm) &&
      Object.entries(subcategories ?? {}).map(([subName, items]) => (
        <div key={subName} className="mb-4">
          <h3 className="text-md font-medium mb-2">{subName}</h3>
          <div className="space-y-4">
            {items.map((item, idx) => (
              <MenuItem
                key={`${item?.id ?? idx}-${subName}`}
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
