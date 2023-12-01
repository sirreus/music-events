import React from "react";

import "./styles.scss";

interface IEventDetails {
  name: string;
  date: string;
  location: string;
  imageUrl: string;
}

interface IEventCardBig {
  event: IEventDetails;
}

export const EventCardBig: React.FC<IEventCardBig> = ({ event }) => {
  const { name, date, location, imageUrl } = event;

  return (
    <div className="event-card-big">
      <div className="event-details-wrapper">
        <div className="event-details">
          <h2 className="event-name">{name}</h2>
          <div className="event-info">
            <div className="event-date">{date}</div>
            <span className="event-location">{location}</span>
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

        <button>Close details</button>
      </div>

      <img src={imageUrl} className="event-cover" alt="" />
    </div>
  );
};
