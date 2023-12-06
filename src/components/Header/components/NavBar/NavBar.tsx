import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectFilter } from "../../../../store/filters/slices";
import { IFilter } from "../../../../store/filters/types";
import { RootState } from "../../../../store";

import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import api from "../../../../api";

import FiltersDropdown from "../FiltersDropdown";
import { Filter } from "../Filter/Filter";

import "./styles.scss";
import { setDetailsVisible } from "../../../../store/events/slices";

export const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const defaultFilters = [{ name: "All genres", id: "all-genres" }];

  const currentFilter: IFilter["name"] = useSelector(
    (state: RootState) => state.filters.name
  );
  const isEventDetailsVisible: boolean = useSelector(
    (state: RootState) => state.events.selectedEvent.isDetailsVisible
  );

  const [filters, setFilters] = useState<IFilter[]>([...defaultFilters]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
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
    // hide prev open event details
    if (isEventDetailsVisible) dispatch(setDetailsVisible(false));

    const selectedFilter = filters[index];
    dispatch(selectFilter(selectedFilter));

    if (open) setOpen(!open);
  };

  useEffect(() => {
    if (width < 672) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

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
