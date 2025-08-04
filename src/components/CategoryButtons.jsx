import React from 'react';

const CategoryButtons = ({ categories, toggleCategory, expandedCategories }) => (
  <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3">
    {categories.map((category) => (
      <button
  key={category.categoryId}
  onClick={() => {
    toggleCategory(category.categoryName);
    const element = document.getElementById(`category-${category.categoryName}`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }}
  className={`${
    expandedCategories[category.categoryName]
      ? 'bg-teal-600 text-white'
      : 'bg-white text-black'
  } py-3 sm:py-4 px-4 pr-1px sm:px-6 rounded-lg font-bold text-margin text-sm  sm:text-base lg:text-lg transition-all hover:scale-105  w-full `}
  style={{ maxWidth: '100%', minWidth: '100px' }} // Adjust as needed
>
  <span className="truncate block w-full text-left" title={category.categoryName.replace('_', ' & ')}>
    {category.categoryName.replace('_', ' & ')}
  </span>
</button>

    ))}
  </div>
);

export default CategoryButtons;
