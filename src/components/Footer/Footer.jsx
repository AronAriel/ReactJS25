import "./Footer.css";
import FooterSection from "./FooterSection";
import logo from "../../assets/icons/logo.svg";
import instlogo from "../../assets/icons/inst-logo.png";
import twitterlogo from "../../assets/icons/twitter-logo.png";
import youtubelogo from "../../assets/icons/youtube-logo.png";

const COMPANY_LINKS = ["Home", "Order", "FAQ", "Contact"];
const TEMPLATE_LINKS = ["Style Guide", "Changelog", "Licence", "Webflow University"];
const FLOWBASE_LINKS = ["More Cloneables"];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p className="footer-slogan-title">Takeaway & Delivery template</p>
          <p className="footer-slogan-subtitle">
            for small - medium businesses.
          </p>
        </div>
        
        <div className="footer-section-wrapper">
          <FooterSection title="Company" items={COMPANY_LINKS} />
        </div>

        <div className="footer-section-wrapper">
          <FooterSection title="Template" items={TEMPLATE_LINKS} />
        </div>

        <div className="footer-section-wrapper">
          <FooterSection title="Flowbase" items={FLOWBASE_LINKS} />
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Built by <a href="#">Flowbase</a> · Powered by <a href="#">Webflow</a>
        </p>
        <div className="footer-icons">
          <a href="#">
            <img src={instlogo} alt="Instagram" />
          </a>
          <a href="#">
            <img src={youtubelogo} alt="Twitter" />
          </a>
          <a href="#">
            <img src={twitterlogo} alt="YouTube" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
