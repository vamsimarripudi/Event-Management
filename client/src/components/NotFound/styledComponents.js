import styled from 'styled-components';

export const NotFoundContainer = styled.div`
display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;

  text-align: center;
  padding: 2rem;
`;

export const NotFoundTitle = styled.h1`
  color: #333;
`;

export const NotFoundMessage = styled.p`
  color: #666;
`;

export const NotFoundImage = styled.img`
  width: 300px;
    margin-bottom: 2rem;

    @media (max-width: 400px) {
        width: 100%;
    }
`;

export const BackButton = styled.button`
  margin-top: 1rem; 
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
`;

