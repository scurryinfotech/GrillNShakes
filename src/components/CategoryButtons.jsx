import React from 'react';

const CategoryButtons = ({ categories, toggleCategory, expandedCategories }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3">
    {categories.map((category) => (
      <button
        key={category.categoryId}
        onClick={() => {
          toggleCategory(category.categoryName); 

          const element = document.getElementById(`category-${category.categoryName}`);

          if (element) {
            element.scrollIntoView({ behavior: 'smooth' ,  block: 'start'});
          }
        }}
        className={`${
          expandedCategories[category.categoryName]
            ? 'bg-teal-600'
            : 'bg-white text-black'
        } py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all hover:scale-105 shadow-md break-words whitespace-normal`}
      >
        {category.categoryName.replace('_', ' & ')}
      </button>
    ))}
  </div>
);

export default CategoryButtons;
