import styled from 'styled-components';

export const EventCardContainer = styled.div`
    background:${({theme}) => theme.bg}
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
    margin: 20px;
    width: 300px;
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0 8px 32px rgba(0,123,255,0.12);
    }
    @media (max-width: 400px) {
        width: 100%;
        margin:10px;
        padding:10px;
    }
`;

export const EventItem = styled.div`
    background:${({theme}) => theme.card}
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 1.5rem;
    width: 300px;
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0 8px 32px rgba(0,123,255,0.12);
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;  

export const EventCardTitle = styled.h2`
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: ${({theme}) => theme.text}
`;

export const EventCardDate = styled.p`
    color: #007bff;
    margin-bottom: 1rem;
    font-weight: 500;
    
`;

export const EventCardRegisterButton = styled.button`
    padding: 0.5rem 1rem;   
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const EventDescription = styled.p`
    color: ${({theme}) => theme.text}
    margin-bottom: 1rem;
    font-size: 1rem;
    line-height: 1.5;
`;

export const EventState = styled.p`
    color: ${({theme}) => theme.text}
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

export const EventVenue = styled.p`
    color: ${({theme}) => theme.text}
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;
export const EventCountry = styled.p`
    color: ${({theme}) => theme.text}
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

export const EventItemContainer = styled.div`
    background: ${({theme}) => theme.card}
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 1.5rem;
    width: 300px;
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0 8px 32px rgba(0,123,255,0.12);
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const EventItemTitle = styled.h2`
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: ${({theme}) => theme.text}
`;

export const EventCategory = styled.p`
    color: ${({theme}) => theme.text}
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
`;

export const EventViewDetailsButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

