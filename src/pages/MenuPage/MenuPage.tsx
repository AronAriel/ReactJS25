import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMeals } from "../../store/slices/mealsSlice";
import CategoryButtons from "../../components/CategoryButtons/CategoryButtons";
import Menu from "../../components/Menu/Menu";
import SeeMoreButton from "../../components/Menu/SeeMoreButton";
import "../../styles/background.css";
import "./MenuPage.css";

function MenuPage() {
  const dispatch = useAppDispatch();
  const meals = useAppSelector((state) => state.meals.meals);
  const status = useAppSelector((state) => state.meals.status);
  const error = useAppSelector((state) => state.meals.error);

  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMeals());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (!meals || meals.length === 0) return;

    const categorySet = new Set(meals.map((meal) => meal.category));
    const categoryList = Array.from(categorySet);
    setCategories(categoryList);

    if (!activeCategory || !categoryList.includes(activeCategory)) {
      setActiveCategory(categoryList[0]);
    }
  }, [meals, activeCategory]);

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed" && error) return <p>Ошибка при загрузке данных: {error}</p>;
  if (meals.length === 0) return <p>Нет доступных блюд.</p>;

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
                onCategorySelect={(category: string) => {
                  setActiveCategory(category);
                  setVisibleCount(6);
                }}
              />
            </div>
            <Menu
              visibleCount={visibleCount}
              onHasMoreChange={(val: boolean) => setHasMore(val)}
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
