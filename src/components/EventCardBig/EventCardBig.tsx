import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ISelectedEvent,
  ISelectedEventDetails,
} from "../../store/events/types";

import api from "../../api";
import parseRawEventDetails from "../../helpers/parseRawEventDetails";

import "./styles.scss";
import { setSelectedEventDetails } from "../../store/events/slices";
import { RootState } from "../../store";

interface IEventCardBig {
  eventId: string;
  extraRow: number;
  onClose: () => void;
}

export const EventCardBig: React.FC<IEventCardBig> = ({
  eventId,
  extraRow,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { data } = api.getEventDetails(eventId);

  const savedEventData: ISelectedEvent["details"] = useSelector(
    (state: RootState) => state.events.selectedEvent.details
  );
  const [event, setEvent] = useState<ISelectedEventDetails | null>(
    null || savedEventData
  );

  useEffect(() => {
    if (data) {
      const eventDetails = parseRawEventDetails([data]);

      setEvent(eventDetails[0]);

      /**
       * save event details into Redux store
       * this is needed if we want to save the visible state of this 'big card'
       * with event data after refreshing the page
       */
      dispatch(setSelectedEventDetails(eventDetails[0]));
    }
  }, [data, dispatch]);

  return (
    <div className="event-card-big" style={{ gridRow: `${extraRow}` }}>
      <div className="event-details-wrapper">
        <div className="event-details">
          <h2 className="event-name">{event?.name}</h2>
          <div className="event-info">
            <div className="date-wrapper">
              <div className="event-date-icon" />
              <div className="event-date">{event?.date}</div>
            </div>

            <div className="location-wrapper">
              <div className="event-location-icon" />
              <span className="event-location">{event?.location}</span>
            </div>
          </div>
          <p className="event-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>

        <button onClick={() => onClose()}>Close details</button>
      </div>
      <div className="image-wrapper">
        <img src={event?.images} className="event-cover" alt="" />
      </div>
    </div>
  );
};
