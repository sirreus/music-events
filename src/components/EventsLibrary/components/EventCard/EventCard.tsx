import React from "react";

import "./styles.scss";

interface IEventCard {
  imageUrl: string;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
}

export const EventCard: React.FC<IEventCard> = ({
  imageUrl,
  index,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={isSelected ? "event-card selected" : "event-card"}
      onClick={() => onSelect(index)}
    >
      <img src={imageUrl} alt="" />
    </div>
  );
};
