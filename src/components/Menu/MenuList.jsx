import MenuItem from "./MenuItem";
import "./MenuList.css";

const MenuList = ({ items }) => (
  <div className="menu-list">
    {items.map((item) => (
      <MenuItem key={item.id} item={item} />
    ))}
  </div>
);

export default MenuList;
