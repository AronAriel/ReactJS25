import React from "react";

interface SeeMoreButtonProps {
  onClick: () => void;
  visible?: boolean;
}

const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({ onClick, visible = true }) => {
  if (!visible) return null;

  return (
    <div className="menu-footer">
      <button className="menu-see-more" onClick={onClick}>
        See more
      </button>
    </div>
  );
};

export default SeeMoreButton;
