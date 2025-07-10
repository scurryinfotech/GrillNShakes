// src/components/MenuList.jsx
import React from 'react';
import CategorySection from './CategorySection';

const MenuList = ({
  groupedItems,
  expandedCategories,
  toggleCategory,
  getItemQuantityInCart,
  addToCart,
  updateCartQuantity
}) => {

  return (
    <div>
      {Object.entries(groupedItems).map(([categoryName, subcategories]) => (
        <CategorySection
          key={categoryName}
          categoryName={categoryName}
          subcategories={subcategories}
          expanded={!!expandedCategories[categoryName]}
          toggleCategory={toggleCategory}
          getItemQuantityInCart={getItemQuantityInCart}
          addToCart={addToCart}
          updateCartQuantity={updateCartQuantity}
          
        />
      ))}
  
    </div>
  );
};

export default MenuList;
