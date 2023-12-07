import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilter } from "../../../../store/filters/slices";
import { removeSelectedEvent } from "../../../../store/events/slices";
import { IFilter } from "../../../../store/filters/types";
import { RootState } from "../../../../store";

import FiltersDropdown from "../FiltersDropdown";
import { Filter } from "../Filter/Filter";

import "./styles.scss";

interface INavBar {
  genresFilters: IFilter[] | undefined;
  isMobile: boolean;
}

export const NavBar: React.FC<INavBar> = ({ genresFilters, isMobile }) => {
  const dispatch = useDispatch();

  const defaultFilters = [{ name: "All genres", id: "all-genres" }];

  const currentFilter: IFilter["name"] = useSelector(
    (state: RootState) => state.filters.name
  );
  const isEventDetailsVisible: boolean = useSelector(
    (state: RootState) => state.events.selectedEvent.isDetailsVisible
  );

  const [filters, setFilters] = useState<IFilter[]>([...defaultFilters]);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (genresFilters && filters.length < 2) {
      setFilters(filters.concat(genresFilters));
    }
  }, [genresFilters, filters]);

  const selectFilterHandler = (index: number) => {
    // hide prev open event details
    if (isEventDetailsVisible) dispatch(removeSelectedEvent());

    const selectedFilter = filters[index];
    dispatch(selectFilter(selectedFilter));

    if (open) setOpen(!open);
  };

  const visibleFilters = isMobile ? defaultFilters : filters.slice(0, 5);
  const dropdownFilters = filters.slice(visibleFilters.length);

  return (
    <nav>
      <div
        className="overlay"
        style={{ display: open ? "block" : "none" }}
        onClick={() => setOpen(!open)}
      />
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
            otherFilters={dropdownFilters || []}
            onSelect={selectFilterHandler}
            currentFilter={currentFilter}
            filtersOffset={visibleFilters.length}
          />
        )}
      </div>
    </nav>
  );
};
