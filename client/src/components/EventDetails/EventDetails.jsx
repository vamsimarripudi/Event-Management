import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventById, getMyRegistrations, registerForEvent, cancelRegistration } from '../../services/api';
import Sidebar from '../Sidebar/Sidebar';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getEventById(id);
        const data = await res.json();
        setEvent(data);

        const regsRes = await getMyRegistrations();
        const regs = await regsRes.json();
        setRegistered(regs.some(r => r.eventId._id === id));
      } catch (err) {
        console.error(err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleRegister = async () => {
    if (processing) return;
    setProcessing(true);
    try {
      const res = await registerForEvent(id);
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Registration failed');
      }
      setRegistered(true);
      // refresh event info to update capacity
      const newRes = await getEventById(id);
      setEvent(await newRes.json());
      alert('Registered successfully');
    } catch (err) {
      alert(err.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!registered || processing) return;
    setProcessing(true);
    try {
      // we need registration id; fetch registrations again to get id
      const regsRes = await getMyRegistrations();
      const regs = await regsRes.json();
      const myReg = regs.find(r => r.eventId._id === id);
      if (!myReg) throw new Error('Not registered');
      const res = await cancelRegistration(myReg._id);
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Cancel failed');
      }
      setRegistered(false);
      const newRes = await getEventById(id);
      setEvent(await newRes.json());
      alert('Registration cancelled');
    } catch (err) {
      alert(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="events-layout">
      <Sidebar />
      <div className="events-content">
        <h2>{event.name}</h2>
        <p><strong>Organizer:</strong> {event.organizer || 'N/A'}</p>
        <p><strong>Location:</strong> {event.location || 'N/A'}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Category:</strong> {event.category || 'General'}</p>
        <p className="description">{event.description}</p>
        <p><strong>Available Seats:</strong> {event.capacity}</p>
        {registered ? (
          <button onClick={handleCancel} disabled={processing} className="primary-btn">
            {processing ? 'Processing...' : 'Cancel Registration'}
          </button>
        ) : event.capacity > 0 ? (
          <button onClick={handleRegister} disabled={processing} className="primary-btn">
            {processing ? 'Processing...' : 'Register for this event'}
          </button>
        ) : (
          <p className="sold-out">Sold out</p>
        )}
        <button onClick={() => navigate(-1)} className="secondary-btn">
          Back
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
