import React from "react";
import NavBar from "./components/NavBar";

import "./styles.scss";

export const Header: React.FC = () => {
  return (
    <header>
      <div className="top-wrapper">
        <h1>Music events</h1>
        <input className="search-input" placeholder="Search for events..." />
      </div>
      <NavBar />
    </header>
  );
};
