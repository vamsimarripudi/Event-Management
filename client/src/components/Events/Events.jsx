import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import EventCard from '../EventCard/EventCard';
import { getEvents, registerForEvent } from '../../services/api';
import './Event.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const query = searchParams.get('q') || '';

  const loadEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getEvents(query);
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams({ q: value });
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleRegister = async (event) => {
    try {
      const res = await registerForEvent(event._id);
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Registration error');
      }
      alert('Registered successfully');
      loadEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredEvents = events.filter(e => {
    if (dateFilter) {
      const selected = new Date(dateFilter).toDateString();
      if (new Date(e.date).toDateString() !== selected) return false;
    }
    if (categoryFilter && e.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="events-layout">
      <Sidebar />
      <div className="events-content">
        <h1>Events</h1>
        <div className="filters" style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search events..."
            value={query}
            onChange={handleSearchChange}
            style={{ padding: '0.5rem', width: '40%', marginRight: '1rem' }}
          />
          <input
            type="date"
            value={dateFilter}
            onChange={handleDateChange}
            style={{ padding: '0.5rem', marginRight: '1rem' }}
          />
          <select value={categoryFilter} onChange={handleCategoryChange} style={{ padding: '0.5rem' }}>
            <option value="">All categories</option>
            {Array.from(new Set(events.map(ev => ev.category).filter(Boolean))).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Loading…</p>
        ) : filteredEvents.length === 0 ? (
          <p>No events available.</p>
        ) : (
          <ul className="event-list">
            {filteredEvents.map(e => (
              <li key={e._id}>
                <EventCard event={e} onRegister={handleRegister} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Events;
