import React, { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  setSelectedEventId,
  setDetailsVisible,
  removeSelectedEvent,
  setCardDetailsPosition,
  removeSelectedEventDetails,
} from "../../store/events/slices";
import { RootState } from "../../store";
import { ISelectedEvent } from "../../store/events/types";

import EventCard from "./components/EventCard";
import EventCardBig from "./components/EventCardBig";

import { IEvent } from "../../store/types";

import "./styles.scss";
import Notification from "./components/Notification";
// import { AngularJSButtonComponent } from "./components/AngularButton/angularjs-button-component";

interface IEventsLibrary {
  events?: IEvent[];
  isLoading: boolean;
  isError: boolean;
}

export const EventsLibrary: React.FC<IEventsLibrary> = ({
  events = [],
  isLoading,
  isError,
}) => {
  const dispatch = useDispatch();

  const selectedEventId: ISelectedEvent["eventId"] = useSelector(
    (state: RootState) => state.events.selectedEvent.eventId,
  );
  const isDetailsVisible: ISelectedEvent["isDetailsVisible"] = useSelector(
    (state: RootState) => state.events.selectedEvent.isDetailsVisible,
  );
  const bigCardRow: ISelectedEvent["cardDetailsPosition"] = useSelector(
    (state: RootState) => state.events.selectedEvent.cardDetailsPosition,
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
    dispatch(removeSelectedEventDetails()); // clean up details for optimization displaying data

    const grid = gridRef.current;
    if (!grid) return;

    dispatch(setSelectedEventId(events[index].id));

    // define amount of column into grid
    const numberOfColumns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
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
    <div
      className={
        events.length === 0 || isError || isLoading
          ? "events-library empty"
          : "events-library"
      }
      ref={gridRef}
    >
      {isLoading && <Notification boldText="Loading ..." />}
      {isError && (
        <Notification boldText="We have some problem..." text=" please reload a page." />
      )}
      {events.length === 0 && (
        <Notification
          boldText="Hmm..."
          text="we didn't find any event that matches your chosen genre or search
              result."
        />
      )}

      {!isLoading &&
        events.map((event, index) => (
          <React.Fragment key={event.id}>
            <EventCard
              imageUrl={event.images}
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
  );
};
