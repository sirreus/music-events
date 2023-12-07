import React from "react";

import "./styles.scss";

interface INotification {
  boldText?: string;
  text?: string;
}

export const Notification: React.FC<INotification> = ({ boldText, text }) => {
  return (
    <div className="notification">
      {boldText && <span className="text bold">{boldText}</span>}
      {text && <span className="text">{text}</span>}
    </div>
  );
};
