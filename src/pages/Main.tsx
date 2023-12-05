import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IEvent } from "../store/types";
import { IFilter } from "../store/filters/types";
import { RootState } from "../store";

import api from "../api";

import Header from "../components/Header";
import EventsLibrary from "../components/EventsLibrary";
import Footer from "../components/Footer";

import "../App.scss";
import parseRawEventsData from "../helpers/parseRawEventsData";
import { setEvents } from "../store/events/slices";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = api.getMusicEvents();

  const currentFilter: IFilter["name"] = useSelector(
    (state: RootState) => state.filters.name
  );

  const events: IEvent[] = useSelector(
    (state: RootState) => state.events.eventsData
  );

  const searchedEvents: IEvent[] = useSelector(
    (state: RootState) => state.search.searchResults
  );

  const searchValue: string = useSelector(
    (state: RootState) => state.search.searchValue
  );

  const [visibleEvents, setVisibleEvents] = useState<IEvent[] | undefined>(
    events
  );

  // Getting events data
  useEffect(() => {
    if (data) {
      const eventsRawData = data._embedded.events;
      const cleanData: IEvent[] = parseRawEventsData(eventsRawData);

      dispatch(setEvents(cleanData));
    }
  }, [data, dispatch]);

  // Filtering by genres
  useEffect(() => {
    if (events && currentFilter !== "All genres") {
      const filteredEvents = events.filter(
        (event) => event.genres.name === currentFilter
      );
      setVisibleEvents(filteredEvents);
    } else {
      setVisibleEvents(events);
    }
  }, [currentFilter, events]);

  // Displaying events by search inputs
  useEffect(() => {
    if (searchValue.length > 0) {
      setVisibleEvents(searchedEvents);
    } else {
      setVisibleEvents(events);
    }
  }, [searchValue, searchedEvents, events]);

  return (
    <main className="App">
      <Header />
      <EventsLibrary events={visibleEvents} />
      <Footer />
    </main>
  );
};
