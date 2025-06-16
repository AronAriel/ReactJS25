import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCart } from "../../store/slices/cartSlice";
import "./CartPage.css";
import "../../styles/background.css";

const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");

  const groupedItems = cartItems.reduce((acc: Record<string, any>, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, quantity: 1 };
    } else {
      acc[item.id].quantity += 1;
    }
    return acc;
  }, {});

  const items = Object.values(groupedItems);

  const handleRemoveItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    dispatch(clearCart());
    updated.forEach((item) => {
      dispatch({ type: "cart/addToCart", payload: { item, quantity: 1 } });
    });
  };

  const handleSubmitOrder = () => {
    console.log("Заказ отправлен:", {
      items,
      address: { street, house },
    });
    alert("Order placed!");
    dispatch(clearCart());
    setStreet("");
    setHouse("");
  };

  return (
    <div className="background">
      <div className="cart-container">
        <p className="cart-title">Finish your order</p>
        {items.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-left">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <span className="cart-item-name">{item.name}</span>
                </div>
                <div className="cart-item-right">
                  <span className="cart-item-price">
                    ${item.price.toFixed(2)} USD
                  </span>
                  <input
                    type="number"
                    value={item.quantity}
                    className="cart-item-quantity"
                    readOnly
                  />
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            <div className="cart-address">
              <label>
                <p>Street</p>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </label>
              <label>
                <p>House</p>
                <input
                  type="text"
                  value={house}
                  onChange={(e) => setHouse(e.target.value)}
                />
              </label>
            </div>

            <button className="cart-order-btn" onClick={handleSubmitOrder}>
              Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
