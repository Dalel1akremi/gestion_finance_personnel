import React from 'react';
import './Notification.css';
function NotificationComponent({ message, onYesClick, onNoClick }) {
  return (
    <div className="notification show">
              <p>{message}</p>
      <div className="notification-buttons">
        <button className="btn btn-success" onClick={onYesClick}>Oui</button>
        <button className="btn btn-danger" onClick={onNoClick}>Non</button>
      </div>
    </div>
  );
}

export default NotificationComponent;
