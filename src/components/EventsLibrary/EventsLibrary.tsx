import React, { useState, useRef } from "react";

import EventCard from "../EventCard";
import EventCardBig from "../EventCardBig";

import { IEvent } from "../../store/types";

import "./styles.scss";

interface IEventsLibrary {
  events?: IEvent[];
}

// const selected = true;

export const EventsLibrary: React.FC<IEventsLibrary> = ({ events = [] }) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [extraRow, setExtraRow] = useState<number>(0);

  const gridRef = useRef<HTMLDivElement>(null);

  const handelShowExtra = (index: number) => {
    setSelectedEvent(events[index]);
    const grid = gridRef.current;

    if (!grid) return;

    // define amount of column into grid
    let numberOfColumns =
      getComputedStyle(grid).gridTemplateColumns.split(" ").length;

    const chunk = events.slice(0, index + 1);
    setExtraRow(Math.ceil(chunk.length / numberOfColumns) + 1);

    if (!isVisible && selectedEvent?.id !== events[index].id) {
      setVisible(true);
    }

    if (isVisible && selectedEvent?.id === events[index].id) {
      setSelectedEvent(null);
      setVisible(false);
    }
  };

  const handelCloseBigCard = () => {
    setSelectedEvent(null);
    setVisible(false);
  };

  console.log();
  return (
    <>
      <div
        className={
          events.length === 0 ? "events-library empty" : "events-library"
        }
        ref={gridRef}
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
        {events.map((event, index) => (
          <React.Fragment key={event.id}>
            <EventCard
              imageUrl={event.images.small}
              index={index}
              onSelect={handelShowExtra}
              isSelected={selectedEvent?.id === event.id}
            />
          </React.Fragment>
        ))}
        {isVisible && selectedEvent && (
          <EventCardBig
            event={selectedEvent}
            extraRow={extraRow}
            onClose={handelCloseBigCard}
          />
        )}
      </div>
    </>
  );
};
