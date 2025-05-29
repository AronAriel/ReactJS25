import React, { useState, useEffect } from "react";
import CategoryButtons from "../../components/CategoryButtons/CategoryButtons";
import Menu from "../../components/Menu/Menu";
import SeeMoreButton from "../../components/Menu/SeeMoreButton";
import { useMeals } from "../../api/mealsApi"; 
import "../../styles/background.css";
import "./MenuPage.css";

function MenuPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const { data: meals, status, error } = useMeals(); 

  useEffect(() => {
    if (!meals) return;

    const categorySet = new Set(meals.map((meal) => meal.category));
    const categoryList = Array.from(categorySet);
    setCategories(categoryList);
    if (categoryList.length > 0) {
      setActiveCategory(categoryList[0]);
    }
  }, [meals]);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  if (!status || status === null) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка при загрузке данных: {error.message}</p>;
  }

  if (!meals || meals.length === 0) {
    return <p>Нет доступных блюд.</p>;
  }

  return (
      <div>
        <div className="menu background">
          <div className="menu-page">
            <div className="menu-text">
              <p className="menu-title">Browse our menu</p>
              <p className="menu-description">
                Use our menu to place an order online, or{" "}
                <span className="tooltip-container">
                  phone
                  <span className="tooltip-text">+370-692-57565</span>
                </span>{" "}
                our store to place a pickup order. Fast and fresh food.
              </p>
            </div>
            <div className="menu-view">
              <div className="category-buttons">
                <CategoryButtons
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategorySelect={(category) => {
                    setActiveCategory(category);
                    setVisibleCount(6);
                  }}
                />
              </div>
              <Menu
                visibleCount={visibleCount}
                onHasMoreChange={(val) => setHasMore(val)}
                activeCategory={activeCategory}
              />
              <SeeMoreButton onClick={handleSeeMore} visible={hasMore} />
            </div>
          </div>
        </div>
      </div>
  );
}

export default MenuPage;
