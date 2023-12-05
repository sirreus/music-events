import React from "react";
import Fuse from "fuse.js";

import NavBar from "./components/NavBar";

import "./styles.scss";
import { IEvent } from "../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setSearchResults, setSearchValue } from "../../store/search/slices";

export const Header: React.FC = () => {
  const dispatch = useDispatch();

  const eventsData: IEvent[] = useSelector(
    (state: RootState) => state.events.eventsData
  );

  const searchItem = (query: string) => {
    dispatch(setSearchValue(query));

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
            placeholder="Search for events..."
            onChange={(e) => searchItem(e.target.value)}
          />
        </form>
      </div>
      <NavBar />
    </header>
  );
};
