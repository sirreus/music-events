import React from "react";
import NavBar from "../NavBar";

import "./styles.scss";

export const Header: React.FC = () => {
  const onChangeFilter = (id: string) => {};

  return (
    <header>
      <div className="top-wrapper">
        <h1>Music events</h1>
        <input className="search-input" placeholder="Search for events..." />
      </div>
      <NavBar onChangeFilter={onChangeFilter} />
    </header>
  );
};
