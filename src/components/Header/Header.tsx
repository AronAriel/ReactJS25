import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import "./Header.css";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/cart2.svg";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;

  const userEmail = useAppSelector((state) => state.auth.userEmail);
  const isLoggedIn = userEmail !== "";

  const handleLogout = async () => {
    await dispatch(logout());
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
              {isLoggedIn ? (
                <button
                  className="nav-link logout-button"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
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
          <button className="cart-button" type="button" aria-label="Cart">
            <img src={cart} alt="Cart" className="cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
