import React, { Component } from "react";
import { CartContext } from "../../context/CartContext";
import "./MenuItem.css";

class MenuItem extends Component {
  static contextType = CartContext;

  handleAddToCart = (event) => {
    event.preventDefault();
    const quantity = parseInt(event.target.elements.quantity.value, 10);
    const { item } = this.props;
    this.context.addToCart(item, quantity);
  };

  render() {
    const { item } = this.props;

    return (
      <div className="menu-item">
        <div className="menu-item-left">
          <img src={item.img} alt={item.meal} className="menu-item-image" />
        </div>
        <div className="menu-items-right">
          <div className="menu-item-header">
            <h3 className="menu-item-title">{item.meal}</h3>
            <p className="menu-item-price">${item.price.toFixed(2)} USD</p>
          </div>
          <div className="menu-item-description">
            <p>{item.instructions}</p>
          </div>

          <form className="menu-item-controls" onSubmit={this.handleAddToCart}>
            <input
              name="quantity"
              type="number"
              min="1"
              defaultValue="1"
              className="menu-item-quantity"
            />
            <button type="submit" className="menu-item-button">
              Add to cart
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MenuItem;
