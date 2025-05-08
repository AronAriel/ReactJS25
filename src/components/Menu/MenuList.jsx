import React, { Component } from "react";
import MenuItem from "./MenuItem";
import "./MenuList.css";

class MenuList extends Component {
  render() {
    const { items } = this.props;

    return (
      <div className="menu-list">
        {items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

export default MenuList;
