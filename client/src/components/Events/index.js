import {useState, useEffect} from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import EventCard from "../EventCard";
import {TailSpin} from "react-loader-spinner";

import {
    EventsContainer,
    
    EventUnOrderedList,
    
    SearchInput,
    
    
} from "./styledComponents";

const apiStatusConstants ={
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'

}

const Events = () => {
    const [events, setEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

    useEffect(() => {
        setApiStatus(apiStatusConstants.inProgress);
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://backend.vamsimarripudi.tech/api/event/events', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setApiStatus(apiStatusConstants.success);
                setEvents(data);
            }


            catch (error) {
                setApiStatus(apiStatusConstants.failure);
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }
    , []);

    useEffect(() => {
        setApiStatus(apiStatusConstants.inProgress);
        const url = "https://backend.vamsimarripudi.tech/api/event/search?query=" + searchQuery;
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setApiStatus(apiStatusConstants.success);
                setEvents(data)
            }
            catch (error) {
                setApiStatus(apiStatusConstants.failure);
                console.error('Error fetching events:', error);
            }
        };
        if (searchQuery) {
            fetchEvents();
        } else {
            fetchEvents();
        }
    }, [searchQuery]);

const renderFinalView = () => {
    switch(apiStatus){
        case apiStatusConstants.inProgress:
            return (
                <>
                <Navbar />
                <EventsContainer>
                    <Sidebar />
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh',width: '100%'}}>
                        <TailSpin type="ThreeDots" color="#007bff" height={80} width={80} />
                    </div>
                </EventsContainer>
                </>
            )
        
            case apiStatusConstants.success:
            return (
                    <EventUnOrderedList>
                    {events.map((event) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                    </EventUnOrderedList>
            )
            

        case apiStatusConstants.failure:
            return (
                <>
                <Navbar />
                <EventsContainer>
                    <Sidebar />
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                        <p style={{color: '#777', fontSize: '1.2rem'}}>Failed to load events. Please try again.</p>
                    </div>
                </EventsContainer>
                </>
            )
        
        default:
            return (
                <>
                <Navbar />
                <EventsContainer>
                    <Sidebar />
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
                        <p style={{color: '#777', fontSize: '1.2rem'}}>No events found.</p>
                    </div>
                </EventsContainer>
                </>
            )
            
    }
}

    return (
        <>
        <Navbar />
        <EventsContainer>
            <Sidebar />
            <div style={{width: '100%'}}>
                <SearchInput
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {renderFinalView()}
            </div>
        </EventsContainer>
        
        </>
    )
}


export default Events;
