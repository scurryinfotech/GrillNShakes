import React from 'react';

const CategoryButtons = ({ categories }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 bg">
    {categories.map(category => (
      <button
        key={category.categoryId}
        onClick={() => {
          const element = document.getElementById(`category-${category.categoryId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className={`${category.color} text-black py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all hover:-90 hover:scale-105 shadow-md`}
      >
        {category.categoryName.replace('_', ' & ')}
      </button>
    ))}
  </div>
);

export default CategoryButtons;
