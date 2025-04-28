import React from "react";
import "./CategoryButtons.css";

const CategoryButtons = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="category-buttons">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-button ${cat === activeCategory ? "active" : ""}`}
          onClick={() => onCategorySelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryButtons;
