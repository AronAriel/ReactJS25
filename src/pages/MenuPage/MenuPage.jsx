import React from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import MenuList from "../../components/Menu/MenuList";
import items from "../../data/MenuItems";
import CategoryButtons from "../../components/CategoryButtons/CategoryButtons";
import "./MenuPage.css";

const categories = [...new Set(items.map((item) => item.category))];

const MenuPage = () => {
  return (
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
                activeCategory="Dessert"
              />
            </div>
            <MenuList items={items} />
          </div>

          <div className="menu-footer">
            <button className="menu-see-more">See more</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;
