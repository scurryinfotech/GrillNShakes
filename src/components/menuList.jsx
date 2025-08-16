import React from "react";
import CategorySection from "./CategorySection";

const MenuList = ({
  groupedItems,
  expandedCategories,
  toggleCategory,
  getItemQuantityInCart,
  addToCart,
  updateCartQuantity,
  categories,
}) => {
  return (
    <div>
      {Object.entries(groupedItems).map(([categoryName, subcategories]) => {
        const category =
          categories.find((c) => c.categoryName === categoryName) || {};
        const categoryId = category.categoryId;

        return (
          <div key={categoryId || categoryName}>
            <CategorySection
              categoryId={categoryId}
              categoryName={categoryName}
              subcategories={subcategories}
              expanded={!!expandedCategories[categoryId]}
              toggleCategory={toggleCategory}
              getItemQuantityInCart={getItemQuantityInCart}
              addToCart={addToCart}
              updateCartQuantity={updateCartQuantity}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MenuList;
