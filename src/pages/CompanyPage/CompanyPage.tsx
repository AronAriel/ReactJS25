import React from "react";
import image from "../../assets/okak.png";
import "./CompanyPage.css";

function CompanyPage() {
  return (
    <div className="company-container background">
      <div className="company-content">
        <div className="company-image-wrapper">
          <img src={image} alt="Company" className="company-image" />
        </div>
        <div className="company-text">
          <h1 className="company-title">About Us</h1>
          <p className="company-description">
            Welcome to <strong>“OKAK Vkusno”</strong> — the very first online food delivery store in Lithuania, 
            founded on <strong>February 30, 1900</strong>, when the internet was not invented yet, 
            but taste buds were already demanding a change.
            <br /><br />
            We weren’t joking when we decided that food should be accessible, fast, and inspiring.
            <br /><br />
            Our project was born from a simple idea: every Lithuanian should have access to cuisines 
            from around the world without leaving their home. From Vilnius to Klaipėda, from ramen soup 
            to potato cepelinai — we deliver everything fresh, hot, and with love.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyPage;
