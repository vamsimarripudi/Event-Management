import {useState, useEffect} from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

import {
    EventsContainer,
    EventItem,
   
    EventDate
} from "./styledComponents";

const Events = () => {
    const [events, setEvents] = useState([]);

    

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://backend.vamsimarripudi.tech/api/event/events', {
                    headers: {
                        'Authorization': `Bearer ${token}`,

                    }
                });
                const data = await response.json();
                console.log(data)
                
                setEvents(data)

            }


            catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }
    , []);

    return (
        <EventsContainer>
            <Navbar />
            <Sidebar />
            {events.map(event => (
                <EventItem key={event._id}>
                    <h1>{event.name}</h1>
                    <EventDate>{new Date(event.date).toLocaleDateString()}</EventDate>
                    <p>{event.organizer}</p>
                    <p>{event.location.state}</p>
                    <p>{event.dateTime.start}</p>
                </EventItem>
            ))}
        </EventsContainer>
    
    )
}



export default Events;
