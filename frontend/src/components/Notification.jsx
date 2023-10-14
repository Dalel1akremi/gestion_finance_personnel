import React from 'react';
import './Notification.css';
function NotificationComponent({ message, onYesClick, onNoClick }) {
  return (
    <div className="notification show">
              <p>{message}</p>
      <div className="notification-buttons">
        <button className="yes-button" onClick={onYesClick}>Oui</button>
        <button className="no-button" onClick={onNoClick}>Non</button>
      </div>
    </div>
  );
}

export default NotificationComponent;
