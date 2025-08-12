import React from "react";

const categoryColors = {
  CHINESE: "#4CAF50", // Green
  PIZZA: "#FFB300", // Yellow
  SANDWICH: "#F06292", // Pink
  BREAKFAST: "#64B5F6", // Light Blue
  "BURGER & ROLL": "#E53935", // Red
  "JUICES & ICECREAM & DESSERT": "#AB47BC", // grey
};

const CategoryButtons = ({
  categories,
  toggleCategory,
  expandedCategories,
}) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3   shadow-md p-2 sm:p-3 rounded-lg bg-white border border-gray-200">
    {categories.map((category) => {
      const categoryName = category.categoryName.replace("_", " & ");
      const bgColor = categoryColors[categoryName.toUpperCase()] || "#ccc"; // default gray if not in map
      const isExpanded = expandedCategories[category.categoryName];
      return (
        <button
          key={category.categoryId}
          id={`category-${category.categoryName}`} 
          onClick={() => {
            toggleCategory(category.categoryName);
            const element = document.getElementById(
              `category-${category.categoryName}`
            );
            if (element) {
              const yOffset = 70; // adjust this to your header height
              const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }}
          className={` flex items-center py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all hover:scale-105 w-full `}
          style={{
            backgroundColor: isExpanded ? bgColor : bgColor, // keep same color when active/inactive
            color: "white",
            maxWidth: "100%",
            minWidth: "100px",
            border: "none",
            height: "30px"
          }}
        >
          <span
            className="truncate block w-full text-left"
            title={categoryName}
          >
            {categoryName}
          </span>
        </button>
      );
    })}
  </div>
);

export default CategoryButtons;
