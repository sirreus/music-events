import React from "react";

import "./styles.scss";
import { IEvent } from "../../store/types";

interface IEventCardBig {
  event: IEvent;
  extraRow: number;
  onClose: () => void;
}

export const EventCardBig: React.FC<IEventCardBig> = ({
  event,
  extraRow,
  onClose,
}) => {
  const { name, date, location, images } = event;

  const eventDate = `${date.date} ${date.time}`;
  const eventLocation = `${location.country}, ${location.city}, ${location.address}`;

  return (
    <div className="event-card-big" style={{ gridRow: `${extraRow}` }}>
      <div className="event-details-wrapper">
        <div className="event-details">
          <h2 className="event-name">{name}</h2>
          <div className="event-info">
            <div className="event-date">{eventDate}</div>
            <span className="event-location">{eventLocation}</span>
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
        <img src={images.big} className="event-cover" alt="" />
      </div>
    </div>
  );
};
