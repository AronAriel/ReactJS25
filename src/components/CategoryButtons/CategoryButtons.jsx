import React, { Component } from "react";
import "./CategoryButtons.css";

class CategoryButtons extends Component {
  render() {
    const { categories, activeCategory } = this.props;
    return (
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-button ${
              cat === activeCategory ? "active" : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
}

export default CategoryButtons;
