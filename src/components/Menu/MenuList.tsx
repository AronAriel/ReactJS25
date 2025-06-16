import React from "react";
import MenuItem from "./MenuItem";
import "./MenuList.css";
import { MenuItemType } from "../../types/MenuItemType";

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => {
  return (
    <div className="menu-list">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;
