import React from "react";

import "./styles.scss";

interface IEventCard {
  imageUrl: string;
}

export const EventCard: React.FC<IEventCard> = ({ imageUrl }) => {
  return (
    <div className="event-card">
      <img src={imageUrl} alt="" />
    </div>
  );
};
