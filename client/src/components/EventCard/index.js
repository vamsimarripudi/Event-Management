import {Link,useNavigate} from 'react-router-dom';

import {
    EventCardContainer,
    EventCardTitle,
    EventCardDate,
    EventCardRegisterButton,
    
    EventCategory,
    EventDescription,
    EventVenue,
    EventCountry,
    EventState,
    

} from "./styledComponents";


const EventCard = ({event}) => {
    const {start} = event.dateTime

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    return (
        <Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <EventCardContainer>
                <EventCardTitle>{event.name}</EventCardTitle>
                <EventCardDate>{formatDate(start)}</EventCardDate>
                <EventCategory>{event.category}</EventCategory>
                <EventDescription>{event.description}</EventDescription>
                <div style={{display: 'flex', flexDirection: 'row', gap: '0.25rem', marginBottom: '1rem'}}>
                    <EventVenue>{event.location.venue},</EventVenue>
                    <EventState>{event.location.state},</EventState>
                    <EventCountry>{event.location.country}</EventCountry>
                </div>
                <EventCardRegisterButton onClick={`${useNavigate(`/events/${event._id}`)}`}>More Info</EventCardRegisterButton>
            </EventCardContainer>
        </Link>
    );
};

export default EventCard;