import React, { useState } from "react";
import Header from "../../components/Header/header";
import Footer from "../../components/Footer/Footer";
import CategoryButtons from "../../components/CategoryButtons/CategoryButtons";
import Menu from "../../components/Menu/Menu";
import { CartProvider } from "../../context/CartContext";
import SeeMoreButton from "../../components/Menu/SeeMoreButton";
import "./MenuPage.css";

function MenuPage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

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
                <CategoryButtons categories={[]} activeCategory="Dessert" />
              </div>
              <Menu
                visibleCount={visibleCount}
                onHasMoreChange={(val) => setHasMore(val)}
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
