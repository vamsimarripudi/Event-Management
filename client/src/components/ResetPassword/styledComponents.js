import styled from "styled-components";

/* ---------- Main Container ---------- */

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  background: ${({ theme }) => theme.bg};
`;

/* ---------- Card ---------- */

export const Card = styled.div`
  width: 100%;
  max-width: 380px;

  padding: 24px;

  border-radius: 22px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (max-width: 480px) {
    padding: 20px;
  }
`;

/* ---------- Form ---------- */

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

/* ---------- Typography ---------- */

export const Heading = styled.h2`
  margin-bottom: 18px;

  font-size: 26px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 480px) {
    font-size: 22px;
  }
`;

export const Label = styled.label`
  margin-bottom: 6px;

  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.text};
`;

export const Message = styled.p`
  font-size: 14px;
  line-height: 1.6;

  color: ${({ theme }) => theme.mutedText};
`;

/* ---------- Input ---------- */

export const Input = styled.input`
  width: 100%;

  padding: 12px 14px;

  margin-bottom: 16px;

  border-radius: 12px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  transition: 0.2s ease;

  &:focus {
    outline: none;

    border-color: #6366f1;

    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }

  &::placeholder {
    color: ${({ theme }) => theme.mutedText};
  }
`;

/* ---------- Buttons ---------- */

export const Button = styled.button`
  width: 100%;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 12px;

  border-radius: 12px;

  background: #6366f1;

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const RetryButton = styled.button`
  margin-top: 14px;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 10px 14px;

  border-radius: 10px;

  background: #ef4444;

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.92;
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* ---------- States ---------- */

export const LoadingContainer = styled.div`
  min-height: 180px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuccessContainer = styled.div`
  text-align: center;

  padding: 12px;
`;

export const FailureContainer = styled.div`
  text-align: center;

  padding: 12px;
`;