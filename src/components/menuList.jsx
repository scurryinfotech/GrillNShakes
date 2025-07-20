// src/components/MenuList.jsx
import React from 'react';
import CategorySection from './CategorySection';

const MenuList = ({
  groupedItems,
  expandedCategories,
  toggleCategory,
  getItemQuantityInCart,
  addToCart,
  updateCartQuantity,
  categories
}) => { 
  return (
    <div>
      {Object.entries(groupedItems).map(([categoryName, subcategories]) => {
        const categoryId = categories.find(cat => cat.categoryName === categoryName)?.categoryId;

        return (
          <div key={categoryName} id={`category-${categoryId}`} className="scroll-mt-24">
            <CategorySection
              categoryName={categoryName}
              subcategories={subcategories}
              expanded={expandedCategories[categoryName]}
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
