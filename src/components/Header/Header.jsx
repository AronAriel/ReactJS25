import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/cart2.svg";

const Header = () => {
  const { getCartCount } = useContext(CartContext);
  const cartCount = getCartCount();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <img src={logo} alt="logo" />
        </NavLink>
      </div>

      <div className="header-right">
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Menu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/company"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Company
              </NavLink>
            </li>
            <li>
              {user ? (
                <NavLink
                  to="/login"
                   className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </nav>

        <div className="cart">
          <button className="cart-button">
            <img src={cart} alt="Cart" className="cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
