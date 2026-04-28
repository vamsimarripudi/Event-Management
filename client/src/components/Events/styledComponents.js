import styled from "styled-components";

export const EventsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100vh;
    background: #f4f6fa;
    padding-left: 220px; /* Space for sidebar */
    padding-top: 64px; /* Space for navbar */
    @media (max-width: 768px) {
        flex-direction: column;
        padding-left: 0;
        padding-top: 80px;
    }
`;

export const EventUnOrderedList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    
    gap: 0.5rem;
    @media screen and (max-width:768px){
       align-items:center;
       justify-content:center;
    }
    
`;

export const EventList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

export const EventItem = styled.li`
    background: #fff;
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin-bottom: 1.5rem;
    transition: box-shadow 0.2s;
    &:hover {
        box-shadow: 0 8px 32px rgba(0,123,255,0.12);
    }
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const EventTitle = styled.h2`
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: #232526;
`;

export const EventDate = styled.p`
    color: #007bff;
    margin-bottom: 1rem;
    font-weight: 500;
`;

export const RegisterButton = styled.button`
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

export const FiltersContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 1rem;
    input, select {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
        &:focus {
            border-color: #007bff;
            outline: none;
        }
    }
    input[type="text"] {
        width: 40%;
        @media (max-width: 600px) {
            width: 100%;
        }
    }
    
    input[type="date"] {
        width: auto;
    }
    select {
        width: auto;
    }
`;


export const NoEventsMessage = styled.p`
    color: #777;
    font-size: 1.2rem;
    margin-top: 2rem;
    text-align: center;
`;

export const SearchInput = styled.input`
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 400px;
    margin-left: 1.5rem;
    border-radius: 4px;
    margin-top:1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
    @media (max-width: 600px) {
        max-width: 100%;
        margin-left:0.7rem;
        padding:10px;

    }
`;

export const Category = styled.select`
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: auto;
    margin-left: 1.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
    @media (max-width: 600px) {
        width: 100%;
        margin-left: 0;
    }
`;

export const Option = styled.option`
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
    @media (max-width: 600px) {
        width: 100%;
        margin-left: 0;
    }
`;


export const PaginationCenter = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:flex-end;
    margin-right:20px;
    
    @media screen and (max-width:768px){
        align-items:center;
    }
`

export const Button = styled.button`
    background-color: transparent;
    border:0px;
    font-weight:bold;
    cursor:pointer;

`

export const PaginationCard = styled.div`
    display:flex;
    justify-content:center;
    
    
`