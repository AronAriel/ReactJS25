import React, { Component } from "react";

class FooterSection extends Component {
  render() {
    const { title, items } = this.props;

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
  }
}

export default FooterSection;
