import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import EventCard from '../EventCard/EventCard';
import { getMyRegistrations, cancelRegistration } from '../../services/api';

import './Dashboard.css';

const Dashboard = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRegistrations = async () => {
    setLoading(true);
    try {
      const res = await getMyRegistrations();
      const data = await res.json();
      const now = new Date();
      setUpcoming(data.filter(r => new Date(r.eventId.date) >= now));
      setPast(data.filter(r => new Date(r.eventId.date) < now));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleCancel = async (registrationId) => {
    try {
      const res = await cancelRegistration(registrationId);
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Cancel failed');
      }
      alert('Cancelled successfully');
      loadRegistrations();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h1>My Events</h1>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <>
            <section>
              <h2>Upcoming</h2>
              {upcoming.length === 0 ? (
                <p>No upcoming events.</p>
              ) : (
                <ul className="event-list">
                  {upcoming.map(r => (
                    <li key={r._id}>
                      <EventCard event={r.eventId} />
                      <div style={{ marginTop: '0.5rem' }}>
                        <Link to={`/event/${r.eventId._id}`}>View details</Link>
                      </div>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(r._id)}
                      >
                        Cancel
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section>
              <h2>Past</h2>
              {past.length === 0 ? (
                <p>No past events.</p>
              ) : (
                <ul className="event-list">
                  {past.map(r => (
                    <li key={r._id}>
                      <EventCard event={r.eventId} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
