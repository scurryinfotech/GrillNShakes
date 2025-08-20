import React from "react";

 const categoryColors = {
  CHINESE: "#4CAF50",
  PIZZA: "#FFB300",
  SANDWICH: "#F06292",
  BREAKFAST: "#64B5F6",
  "BURGER & ROLL": "#E53935",
  "JUICES & ICECREAM & DESSERT": "#d094ea",
};

const CategoryButtons = ({ categories, toggleCategory, expandedCategories }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 shadow-md p-2 sm:p-3 rounded-lg bg-white border border-gray-200">
    {categories.map((category) => {
      const categoryName = (category.categoryName || "").replace("_", " & ");
      const bgColor = categoryColors[categoryName.toUpperCase()] || "#ccc";
      const isExpanded = !!expandedCategories[category.categoryId];

      return (
        <button
          key={category.categoryId}
          onClick={() => {
            // Expand then scroll handled by parent (passed in toggleCategory)
            toggleCategory(category.categoryId);
          }}
          className="flex items-center py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-sm sm:text-base lg:text-lg transition-all hover:scale-105 w-full"
          style={{
            backgroundColor: bgColor,
            color: "white",
            border: "none",
            height: "30px",
          }}
          title={categoryName}
        >
          <span className="truncate block w-full text-left">
            {categoryName} {isExpanded ? "" : ""}
          </span>
        </button>
      );
    })}
  </div>
);

export default CategoryButtons;
