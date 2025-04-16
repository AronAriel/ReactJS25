import React from "react";
import "./Header.css";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/cart2.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="header-right">
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#" className="menu-link">
                Menu
              </a>
            </li>
            <li>
              <a href="#">Company</a>
            </li>
            <li>
              <a href="#">Login</a>
            </li>
          </ul>
        </nav>

        <div className="cart">
          <button className="cart-button">
            <img src={cart} alt="Cart" className="cart-icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
