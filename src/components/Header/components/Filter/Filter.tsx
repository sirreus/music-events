import React from "react";

import "./styles.scss";
import { IFilter } from "../../../../store/filters/types";

interface FilterComponent {
  filter: IFilter;
  index: number;
  currentFilter: string;
  onSelect: (index: number) => void;
}

export const Filter: React.FC<FilterComponent> = ({
  filter,
  index,
  onSelect,
  currentFilter,
}) => {
  return (
    <div
      className={
        filter.name === currentFilter ? "genres-filter active" : "genres-filter"
      }
      data-testid={
        filter.name === currentFilter ? "genres-filter-active" : "genres-filter"
      }
      onClick={() => onSelect(index)}
      key={index}
    >
      {filter.name}
    </div>
  );
};
