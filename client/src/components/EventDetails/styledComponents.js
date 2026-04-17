import styled from "styled-components";

export const EventDetailsContainer = styled.div`    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #f0f2f5;
    min-height: 100vh;
`;

export const EventCard = styled.div`
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 100%;
        height: auto;
        border-radius: 4px;
        margin-bottom: 1rem;
    }
    h2 {
        margin-bottom: 0.5rem;
    }
    p {
        margin-bottom: 0.5rem;
    }
    @media (max-width: 400px) {
        padding: 1rem;
        h2 {
            font-size: 1.5rem;
        }
        p { 
            font-size: 0.9rem;
        }

        img {
            width: 100%;
            height: auto;
        }
        
    }
    @media (max-width: 300px) {
        padding: 0.5rem;
        h2 {
            font-size: 1.2rem;
        }
        p { 
            font-size: 0.8rem;
        }
        img {
            width: 100%;
            height: auto;
        }
    
}
`;

export const LoadingMessage = styled.p`
    display: flex;  
    justify-content: center;
    align-items: center;
    @media (max-width: 400px) {
        font-size: 0.9rem;
    }   
    @media (max-width: 300px) { 
        font-size: 0.8rem;
        line-height: 1.4;
    }
`
export const RegisterButton = styled.button`
    padding: 0.75rem 1.5rem;    
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 400px) {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
    }
    @media (max-width: 300px) {
        font-size: 0.8rem;
        padding: 0.5rem 0.75rem;
    }
`;