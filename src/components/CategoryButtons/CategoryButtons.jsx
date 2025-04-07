import "./CategoryButtons.css";

const CategoryButtons = ({ categories, activeCategory }) => {
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
};

export default CategoryButtons;
