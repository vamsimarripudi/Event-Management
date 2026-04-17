import styled from "styled-components";

export const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #f0f2f5;
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
    background-color: #fff;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const EventTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

export const EventDate = styled.p`
    color: #666;
    margin-bottom: 1rem;
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

