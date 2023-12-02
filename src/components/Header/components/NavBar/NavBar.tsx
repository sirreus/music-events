import React, { useEffect, useState } from "react";

import "./styles.scss";
import api from "../../../../api";
import FiltersDropdown from "../FiltersDropdown";
import { Filter, IFilter } from "../Filter/Filter";

export const NavBar: React.FC = () => {
  const { data } = api.getMusicGenres();

  const defaultFilters = [
    { name: "All genres", id: "all-genres", isActive: true },
  ];

  const [filters, setFilters] = useState<IFilter[]>([...defaultFilters]);
  const [currentFilter, setCurrentFilter] = useState<IFilter>(filters[0]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data && filters.length < 2) {
      const genresRawData = data.segment._embedded.genres;

      const formatData = genresRawData.map(
        ({ id, name }: { id: string; name: string }) => {
          return {
            id,
            name,
            isActive: false,
          };
        }
      );

      setFilters(filters.concat(formatData));
    }
  }, [data, filters]);

  const selectFilter = (index: number) => {
    const selectedFilter = filters[index];
    setCurrentFilter(selectedFilter);
  };

  return (
    <nav>
      {filters.slice(0, 5).map((filter, index) => (
        <Filter
          filter={filter}
          index={index}
          onSelect={selectFilter}
          key={index}
        />
      ))}
      <div className="button-wrapper">
        <button className="show-more-btn" onClick={() => setOpen(!open)}>
          More...
        </button>
        {open && (
          <FiltersDropdown
            otherFilters={filters.slice(6) || []}
            onSelect={selectFilter}
          />
        )}
      </div>
    </nav>
  );
};
