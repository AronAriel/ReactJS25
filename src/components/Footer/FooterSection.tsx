import React from "react";

interface FooterSectionProps {
  title: string;
  items: string[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, items }) => {
  return (
    <div className="footer-section">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>
            {title === "Template" ? (
              <a href="https://www.google.com/">{item}</a>
            ) : (
              <span>{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
