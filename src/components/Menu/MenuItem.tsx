import React, { FormEvent } from "react";
import { useAppDispatch } from "../../store/hooks"; 
import { addToCart } from "../../store/slices/cartSlice"; 
import { CartItem } from "../../store/slices/cartSlice"; 
import "./MenuItem.css";
import { MenuItemType } from "../../types/MenuItemType";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const quantityInput = form.elements.namedItem("quantity") as HTMLInputElement;
    const quantity = parseInt(quantityInput.value, 10);

    const cartItem: CartItem = {
      id: item.id.toString(),
      name: item.meal,
      price: item.price,
      img: item.img,
      instructions: item.instructions,
    };

    dispatch(addToCart({ item: cartItem, quantity }));
  };

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

        <form className="menu-item-controls" onSubmit={handleAddToCart}>
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
};

export default MenuItem;
