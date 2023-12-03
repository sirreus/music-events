import React from "react";

import EventCard from "../EventCard";
import EventCardBig from "../EventCardBig";

import { IEvent } from "../../store/types";

import "./styles.scss";

interface IEventsLibrary {
  events?: IEvent[];
}

// const selected = true;

export const EventsLibrary: React.FC<IEventsLibrary> = ({ events = [] }) => {
  return (
    <>
      <div
        className={
          events.length === 0 ? "events-library empty" : "events-library"
        }
      >
        {events.length === 0 && (
          <div className="notification">
            <span className="text bold">Sorry,</span>
            <span className="text">
              we didn't find any event that matches your chosen genre or search
              result.
            </span>
          </div>
        )}
        {events.map((event) => (
          <React.Fragment key={event.id}>
            <EventCard imageUrl={event.images.small} />
            {/* {event.selected && <EventCardBig event={event} />} */}
          </React.Fragment>
        ))}
      </div>

      {/* TODO: find solution for big banner */}
      {/* {selected && (
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "black",
          }}
        />
      )} */}
    </>
  );
};
