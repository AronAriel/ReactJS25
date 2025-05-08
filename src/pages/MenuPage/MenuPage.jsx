import React, { useState, useEffect } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import CategoryButtons from "../../components/CategoryButtons/CategoryButtons";
import Menu from "../../components/Menu/Menu";
import { CartProvider } from "../../context/CartContext";
import SeeMoreButton from "../../components/Menu/SeeMoreButton";
import { fetchMeals } from "../../api/mealsApi";
import "./MenuPage.css";

function MenuPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const meals = await fetchMeals();
        const categorySet = new Set(meals.map((meal) => meal.category));
        const categoryList = Array.from(categorySet);
        setCategories(categoryList);
        if (categoryList.length > 0) {
          setActiveCategory(categoryList[0]);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    }

    loadData();
  }, []);

  return (
    <CartProvider>
      <div>
        <Header />
        <div className="menu">
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
        <Footer />
      </div>
    </CartProvider>
  );
}

export default MenuPage;
