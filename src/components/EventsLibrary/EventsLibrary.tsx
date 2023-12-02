import React from "react";

import EventCard from "../EventCard";
import EventCardBig from "../EventCardBig";

import { IEvent } from "../../store/types";

import "./styles.scss";

interface IEventsLibrary {
  events?: IEvent[];
}

export const EventsLibrary: React.FC<IEventsLibrary> = ({ events = [] }) => {
  return (
    <>
      <div className="events-library">
        {events.map((event) => (
          <React.Fragment key={event.id}>
            <EventCard imageUrl={event.images.small} />
            {/* {event.selected && <EventCardBig />} */}
          </React.Fragment>
        ))}
      </div>
      {/* <EventCardBig event={emptyEvent} /> */}
    </>
  );
};
