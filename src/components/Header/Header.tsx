import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fuse from "fuse.js";

import { RootState } from "../../store";
import { IEvent } from "../../store/types";
import { setDetailsVisible } from "../../store/events/slices";
import { setSearchResults, setSearchValue } from "../../store/search/slices";
import { IFilter } from "../../store/filters/types";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import api from "../../api";

import NavBar from "./components/NavBar";

import "./styles.scss";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const { data: genresData } = api.getMusicGenres();

  const eventsData: IEvent[] = useSelector(
    (state: RootState) => state.events.eventsData
  );
  const searchValue: string = useSelector(
    (state: RootState) => state.search.searchValue
  );
  const isEventDetailsVisible: boolean = useSelector(
    (state: RootState) => state.events.selectedEvent.isDetailsVisible
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [genres, setGenres] = useState<IFilter[] | undefined>(undefined);

  useEffect(() => {
    if (width < 672) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    if (genresData) {
      const genresRawData = genresData.segment._embedded.genres;

      const formatData = genresRawData.map(
        ({ id, name }: { id: string; name: string }) => {
          return { id, name };
        }
      );

      setGenres(formatData);
    }
  }, [genresData]);

  const searchItem = (query: string) => {
    dispatch(setSearchValue(query));

    // hide prev open event details
    if (isEventDetailsVisible) dispatch(setDetailsVisible(false));

    if (!query) {
      dispatch(setSearchResults(eventsData));
      return;
    }

    const fuse = new Fuse(eventsData, {
      keys: ["name", "genres.name"], // as additional search keys can add 'location.country' and 'location.city'
    });

    const results = fuse.search(query);
    const finalResult: any[] = [];

    if (results.length) {
      results.forEach((result) => {
        finalResult.push(result.item);
      });

      dispatch(setSearchResults(finalResult));
    } else {
      dispatch(setSearchResults([]));
    }
  };

  return (
    <header>
      <div className="top-wrapper">
        <h1>Music events</h1>
        <form className="search-form">
          <i className="search-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search for events..."
            onChange={(e) => searchItem(e.target.value)}
            value={searchValue}
          />
        </form>
      </div>
      <NavBar genresFilters={genres} isMobile={isMobile} />
    </header>
  );
};
