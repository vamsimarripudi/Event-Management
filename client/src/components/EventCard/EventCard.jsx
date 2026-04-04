import React, { useState } from 'react';

import './EventCard.css';
import { Link } from 'react-router-dom';
const EventCard = ({ event, onRegister }) => {
  const [disabled, setDisabled] = useState(false);

  // ensure we have a date string to display
  const formattedDate = event?.date
    ? new Date(event.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'TBD';

  const handleClick = evt => {
    if (disabled) return;
    setDisabled(true);
    onRegister?.(event);
    // re-enable after a short delay to prevent double-tap storms
    setTimeout(() => setDisabled(false), 1000);
  };

  return (
    <div className="event-card">
      <h3>{event?.name || 'Sample Event'}</h3>
      <p className="description">
        {event?.description || 'Description will go here.'}
      </p>
      <p className="date">{formattedDate}</p>
      {event?.capacity != null && <p className="capacity">Seats: {event.capacity}</p>}
      {event?.location && <p className="location">{event.location}</p>}
      {onRegister && (
        event.capacity > 0 ? (
          <button className="register-btn" onClick={handleClick} disabled={disabled}>
            {disabled ? 'Processing...' : 'Register'}
          </button>
        ) : (
          <p className="sold-out">Sold out</p>
        )
      )}      <Link to={`/event/${event._id}`} className="details-link">
        View Details
      </Link>    </div>
  );
};

export default EventCard;
