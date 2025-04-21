import "./MenuItem.css";

const MenuItem = ({ item }) => (
  <div className="menu-item">
    <div className="menu-item-left">
      <img src={item.image} alt={item.name} className="menu-item-image" />
    </div>
    <div className="menu-items-right">
      <div className="menu-item-header">
        <h3 className="menu-item-title">{item.name}</h3>
        <p className="menu-item-price">${item.price.toFixed(2)} USD</p>
      </div>
      <div className="menu-item-description">
        <p>{item.description}</p>
      </div>

      <form className="menu-item-controls">
        <input
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

export default MenuItem;
