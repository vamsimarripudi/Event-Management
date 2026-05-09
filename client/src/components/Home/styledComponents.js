import styled from "styled-components";

/* ---------- Main Layout ---------- */

export const MainCardContainer = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  background: ${({ theme }) => theme.bg};

  background-size: cover;
`;

/* ---------- Main Card ---------- */

export const EventManagmentCard = styled.div`
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 28px 22px;

  border-radius: 24px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  text-align: center;

  @media screen and (min-width: 768px) {
    padding: 36px 28px;
  }
`;

/* ---------- Typography ---------- */

export const Title = styled.h1`
  margin: 0;

  font-size: 32px;
  font-weight: 700;

  line-height: 1.3;

  color: ${({ theme }) => theme.text};

  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

export const Description = styled.p`
  width: 100%;
  max-width: 320px;

  margin: 16px 0 24px;

  font-size: 14px;
  line-height: 1.7;

  color: ${({ theme }) => theme.mutedText};
`;

export const SubHeading = styled.p`
  margin-top: 8px;

  font-size: 15px;

  color: ${({ theme }) => theme.mutedText};
`;

/* ---------- Button Wrapper ---------- */

export const UserActionButtons = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 12px;

  margin-top: 10px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;

/* ---------- Register Button ---------- */

export const RegisterButton = styled.button`
  flex: 1;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 12px 20px;

  border-radius: 12px;

  background: #6366f1;

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* ---------- Login Button ---------- */

export const LoginButton = styled.button`
  flex: 1;

  border: 1px solid ${({ theme }) => theme.border};

  outline: none;

  cursor: pointer;

  padding: 12px 20px;

  border-radius: 12px;

  background: transparent;

  color: ${({ theme }) => theme.text};

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.bg};
  }

  &:active {
    transform: scale(0.98);
  }
`;