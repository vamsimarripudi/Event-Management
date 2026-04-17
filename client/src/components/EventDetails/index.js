import {useState,useEffect} from "react"

import { useParams, useNavigate } from 'react-router-dom';
import {} from "./styledComponents"


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
    }
    , [id]);
    
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
        }
        catch (err) {
            alert(err.message);
        }
        finally {
            setProcessing(false);
        }
    };

    const handleCancel = async () => {
        if (!registered || processing) return;
        setProcessing(true);
        try {
            const res = await cancelRegistration(id);
            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.message || 'Cancel failed');
            }
            setRegistered(false);
            // refresh event info to update capacity
            const newRes = await getEventById(id);
            setEvent(await newRes.json());
            alert('Cancelled successfully');
        }
        catch (err) {
            alert(err.message);
        }
        finally {
            setProcessing(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleString()}</p>
            <p>Category: {event.category}</p>
            <p>Available Seats: {event.capacity}</p>
            {registered ? (
                <button onClick={handleCancel} disabled={processing}>Cancel Registration</button>
            ) : (
                <button onClick={handleRegister} disabled={processing || event.capacity <= 0}>Register</button>
            )}
        </div>
    );
}

const registerForEvent = async (eventId) => {
    try{
        const event = await
        Event.findById(eventId);
        if (!event) {
            return res.status(404).json({message:"Event not found"})
        }
        if (event.capacity <= 0) {
            return res.status(400).json({message:"Event is full"})
        }
        const registration = new Registration({
            userId:req.user.id,
            eventId
        });
        await registration.save();
        await

        Event
        .findByIdAndUpdate(eventId, {$inc:{capacity:-1}}, {new:true})
        res.status(201).json({message:"Registered successfully"})
    }

    catch(error){
        res.status(500).json({message:error.message})
    }
}

const cancelRegistration = async (eventId) => {
    try{
        const registration = await Registration.findOne({userId:req.user.id, eventId});
        if (!registration) {
            return res.status(404).json({message:"Registration not found"})
        }
        await registration.remove();
        await Event.findByIdAndUpdate(eventId, {$inc:{capacity:1}}, {new:true})
    
