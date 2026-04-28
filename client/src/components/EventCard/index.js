import {Link,useNavigate,useParams} from 'react-router-dom';

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
    const {_id} = useParams();
    const {start} = event.dateTime
    const navigate = useNavigate()
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
                 <EventCardRegisterButton onClick={() => navigate(`/events/${_id}`)}>
                    View Details
                </EventCardRegisterButton>
            </EventCardContainer>
        </Link>
    );
};

export default EventCard;