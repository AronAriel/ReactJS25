const FooterSection = ({ title, items }) => {
  return (
    <div className="footer-section">
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
