import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedEventId,
  setDetailsVisible,
  removeSelectedEvent,
  setCardDetailsPosition,
} from "../../store/events/slices";
import { RootState } from "../../store";
import { ISelectedEvent } from "../../store/events/types";

import EventCard from "../EventCard";
import EventCardBig from "../EventCardBig";

import { IEvent } from "../../store/types";

import "./styles.scss";

interface IEventsLibrary {
  events?: IEvent[];
}

export const EventsLibrary: React.FC<IEventsLibrary> = ({ events = [] }) => {
  const dispatch = useDispatch();

  const selectedEventId: ISelectedEvent["eventId"] = useSelector(
    (state: RootState) => state.events.selectedEvent.eventId
  );
  const isDetailsVisible: ISelectedEvent["isDetailsVisible"] = useSelector(
    (state: RootState) => state.events.selectedEvent.isDetailsVisible
  );
  const bigCardRow: ISelectedEvent["cardDetailsPosition"] = useSelector(
    (state: RootState) => state.events.selectedEvent.cardDetailsPosition
  );

  /**
   * this component state is need if don't want to save
   * big card visible after refreshing the page
   */
  // const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  // const [isVisible, setVisible] = useState<boolean>(false);
  // const [extraRow, setExtraRow] = useState<number>(0);

  const gridRef = useRef<HTMLDivElement>(null);

  const handelShowExtra = (index: number) => {
    const grid = gridRef.current;
    if (!grid) return;

    dispatch(setSelectedEventId(events[index].id));

    // define amount of column into grid
    let numberOfColumns =
      getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    const chunk = events.slice(0, index + 1);
    const extraCardPosition = Math.ceil(chunk.length / numberOfColumns) + 1;
    dispatch(setCardDetailsPosition(extraCardPosition));

    if (!isDetailsVisible && selectedEventId !== events[index].id) {
      dispatch(setDetailsVisible(true));
    }

    if (isDetailsVisible && selectedEventId === events[index].id) {
      dispatch(removeSelectedEvent());
    }
  };

  const handelCloseBigCard = () => {
    dispatch(removeSelectedEvent());
  };

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
              isSelected={selectedEventId === event.id}
            />
          </React.Fragment>
        ))}
        {events.length > 0 && isDetailsVisible && selectedEventId && (
          <EventCardBig
            eventId={selectedEventId}
            extraRow={bigCardRow}
            onClose={handelCloseBigCard}
          />
        )}
      </div>
    </>
  );
};
