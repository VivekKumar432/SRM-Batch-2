//import React from "react";

const Header = () => {
  const toggleTheme = () => {
    document.body.dataset.theme =
      document.body.dataset.theme === "dark" ? "light" : "dark";
  };

  return (
    <div className="header-right">
      <button onClick={toggleTheme} className="theme-toggle-button">
        Toggle Theme
      </button>
    </div>
  );
};

export default Header;
