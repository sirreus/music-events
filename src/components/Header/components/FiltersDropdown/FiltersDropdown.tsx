import React from "react";
import { Filter, IFilter } from "../Filter/Filter";

import "./styles.scss";

interface IFiltersDropdown {
  otherFilters: IFilter[];
  onSelect: (index: number) => void;
}

export const FiltersDropdown: React.FC<IFiltersDropdown> = ({
  otherFilters,
  onSelect,
}) => {
  return (
    <div className="dropdown-wrapper">
      <ul className="filters-list">
        {otherFilters.map((filter, index) => (
          <Filter
            filter={filter}
            index={index}
            onSelect={onSelect}
            key={index}
          />
        ))}
      </ul>
    </div>
  );
};
