import styled from "styled-components";

export const MainCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 16px;
  background-size: cover;
`;

export const EventManagmentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 32px 24px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin: 0;
  color: #111827;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

export const Description = styled.p`
  width: 100%;
  max-width: 320px;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 16px 0 24px;
`;

export const SubHeading = styled.p`
  margin: 0;
  margin-top: 8px;
  font-size: 16px;
  color: #4b5563;
`;

export const UserActionButtons = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const RegisterButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const LoginButton = styled.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: transparent;
  color: #111827;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #9ca3af;
  }

  &:active {
    transform: scale(0.98);
  }
`;