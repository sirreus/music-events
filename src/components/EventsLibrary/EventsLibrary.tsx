import React from "react";

import EventCard from "../EventCard";

import "./styles.scss";
import EventCardBig from "../EventCardBig";

interface IEvent {
  id: number;
  imageUrl: string;
  selected: boolean;
}

export const EventsLibrary = () => {
  const emptyEvent = {
    name: "string",
    date: "string",
    location: "string",
    imageUrl: "string",
  };
  const events: IEvent[] = [
    {
      id: 1,
      imageUrl: "1",
      selected: true,
    },
    {
      id: 2,
      imageUrl: "2",
      selected: false,
    },
    {
      id: 3,
      imageUrl: "3",
      selected: false,
    },
    {
      id: 4,
      imageUrl: "4",
      selected: false,
    },
  ];
  return (
    <>
      <div className="events-library">
        {events.map((event) => (
          <React.Fragment key={event.id}>
            <EventCard imageUrl={event.imageUrl} />
            {/* {event.selected && <EventCardBig />} */}
          </React.Fragment>
        ))}
      </div>
      <EventCardBig event={emptyEvent} />
    </>
  );
};
