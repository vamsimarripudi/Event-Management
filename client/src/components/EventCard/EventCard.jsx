import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card" style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>{event?.title || 'Sample Event'}</h3>
      <p>{event?.description || 'Description will go here.'}</p>
    </div>
  );
};

export default EventCard;
