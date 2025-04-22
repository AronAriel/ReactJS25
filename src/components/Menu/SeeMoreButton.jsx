import React from "react";

function SeeMoreButton({ onClick, visible = true }) {
  if (!visible) return null;

  return (
    <div className="menu-footer">
      <button className="menu-see-more" onClick={onClick}>
        See more
      </button>
    </div>
  );
}

export default SeeMoreButton;
