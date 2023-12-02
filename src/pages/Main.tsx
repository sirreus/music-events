import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IEvent } from "../store/types";
import { IFilter } from "../store/filters/types";
import { RootState } from "../store";

import api from "../api";

import Header from "../components/Header";
import EventsLibrary from "../components/EventsLibrary";
import Footer from "../components/Footer";

import "../App.scss";
import parseRawEventsData from "../helpers/parseRawEventsData";

export const MainPage: React.FC = () => {
  const { data } = api.getMusicEvents();

  const currentFilter: IFilter["name"] = useSelector(
    (state: RootState) => state.filters.name
  );

  const [events, setEvents] = useState<IEvent[] | undefined>(undefined);
  const [visibleEvents, setVisibleEvents] = useState<IEvent[] | undefined>(
    events
  );

  useEffect(() => {
    if (data) {
      const eventsRawData = data._embedded.events;
      const cleanData: IEvent[] = parseRawEventsData(eventsRawData);

      setEvents(cleanData);
    }
  }, [data]);

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

  return (
    <main className="App">
      <Header />
      <EventsLibrary events={visibleEvents} />
      <Footer />
    </main>
  );
};
