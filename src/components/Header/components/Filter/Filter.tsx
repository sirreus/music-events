import React from "react";

import "./styles.scss";

export interface IFilter {
  id: string;
  name: string;
  isActive: boolean;
}

interface FilterComponent {
  filter: IFilter;
  index: number;
  onSelect: (index: number) => void;
}

export const Filter: React.FC<FilterComponent> = ({
  filter,
  index,
  onSelect,
}) => {
  return (
    <div
      className={filter.isActive ? "genres-filter active" : "genres-filter"}
      onClick={() => onSelect(index)}
      key={index}
    >
      {filter.name}
    </div>
  );
};
