import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilter } from "../../../../store/filters/slices";
import { IFilter } from "../../../../store/filters/types";
import { RootState } from "../../../../store";

import api from "../../../../api";

import FiltersDropdown from "../FiltersDropdown";
import { Filter } from "../Filter/Filter";

import "./styles.scss";

export const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  const defaultFilters = [
    { name: "All genres", id: "all-genres", isActive: true },
  ];

  const currentFilter: IFilter["name"] = useSelector(
    (state: RootState) => state.filters.name
  );
  const [filters, setFilters] = useState<IFilter[]>([...defaultFilters]);
  const [open, setOpen] = useState<boolean>(false);

  const { data } = api.getMusicGenres();

  useEffect(() => {
    if (data && filters.length < 2) {
      const genresRawData = data.segment._embedded.genres;

      const formatData = genresRawData.map(
        ({ id, name }: { id: string; name: string }) => {
          return { id, name };
        }
      );

      setFilters(filters.concat(formatData));
    }
  }, [data, filters]);

  const selectFilterHandler = (index: number) => {
    const selectedFilter = filters[index];
    dispatch(selectFilter(selectedFilter));
  };

  const visibleFilters = filters.slice(0, 5);
  const filtersOffset = visibleFilters.length + 1;

  return (
    <nav>
      {visibleFilters.map((filter, index) => (
        <Filter
          filter={filter}
          index={index}
          onSelect={selectFilterHandler}
          currentFilter={currentFilter}
          key={index}
        />
      ))}
      <div className="button-wrapper">
        <button className="show-more-btn" onClick={() => setOpen(!open)}>
          More...
        </button>
        {open && (
          <FiltersDropdown
            otherFilters={filters.slice(filtersOffset) || []}
            onSelect={selectFilterHandler}
            currentFilter={currentFilter}
            filtersOffset={filtersOffset}
          />
        )}
      </div>
    </nav>
  );
};
