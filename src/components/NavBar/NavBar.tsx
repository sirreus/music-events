import React from "react";

import "./styles.scss";

interface INavBar {
  onChangeFilter: (id: string) => void;
}

export const NavBar: React.FC<INavBar> = ({ onChangeFilter }) => {
  const filters = [
    { name: "All genres", id: "all-genres", isActive: true },
    { name: "Alternative", id: "alternative", isActive: false },
    { name: "Ballads/Romantic", id: "ballads-romantic", isActive: false },
    { name: "Blues", id: "blues", isActive: false },
    { name: "Chanson Francais", id: "chanson", isActive: false },
    { name: "More...", id: "more", isActive: false },
  ];

  const selectFilter = (id: string) => {
    onChangeFilter(id);
  };

  return (
    <nav>
      {filters.map((filters) => (
        <div
          className={
            filters.isActive ? "genres-filter active" : "genres-filter"
          }
          onClick={() => selectFilter(filters.id)}
          key={filters.id}
        >
          {filters.name}
        </div>
      ))}
    </nav>
  );
};
