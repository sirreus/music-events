import React from "react";

import { IFilter } from "../../../../store/filters/types";

import { Filter } from "../Filter/Filter";

import "./styles.scss";

interface IFiltersDropdown {
  otherFilters: IFilter[];
  onSelect: (index: number) => void;
  currentFilter: string;
  filtersOffset: number;
}

export const FiltersDropdown: React.FC<IFiltersDropdown> = ({
  otherFilters,
  onSelect,
  currentFilter,
  filtersOffset,
}) => {
  return (
    <div className="dropdown-wrapper">
      <ul className="filters-list">
        {otherFilters.map((filter, index) => (
          <Filter
            filter={filter}
            index={index + filtersOffset}
            onSelect={onSelect}
            currentFilter={currentFilter}
            key={index + filtersOffset}
          />
        ))}
      </ul>
    </div>
  );
};
