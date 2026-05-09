import styled from "styled-components";

/* ---------- Main Container ---------- */

export const RegisterContainer = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  background: ${({ theme }) => theme.bg};
`;

/* ---------- Register Form ---------- */

export const RegisterForm = styled.form`
  width: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px;

  border-radius: 22px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (max-width: 480px) {
    padding: 20px;
  }
`;

/* ---------- Titles ---------- */

export const RegisterTitle = styled.h2`
  margin-bottom: 20px;

  font-size: 28px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 480px) {
    font-size: 24px;
  }
`;

export const AuthTitle = styled.h2`
  margin-bottom: 18px;

  font-size: 26px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 480px) {
    font-size: 22px;
  }
`;

/* ---------- Input Group ---------- */

export const InputGroup = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  margin-bottom: 16px;
`;

export const Label = styled.label`
  margin-bottom: 6px;

  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.text};
`;

/* ---------- Inputs ---------- */

export const RegisterInput = styled.input`
  width: 100%;

  padding: 12px 14px;

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

export const RegisterButton = styled.button`
  width: 100%;
  height: 46px;

  border: none;
  outline: none;

  cursor: pointer;

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AuthButton = styled.button`
  width: 100%;

  padding: 12px;

  border: none;
  outline: none;

  cursor: pointer;

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* ---------- Login Link ---------- */

export const LoginLink = styled.p`
  margin-top: 18px;

  text-align: center;

  font-size: 14px;

  color: ${({ theme }) => theme.mutedText};

  a {
    color: #6366f1;

    text-decoration: none;

    font-weight: 600;

    transition: 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

/* ---------- Loading ---------- */

export const LoadingMessage = styled.p`
  margin-top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 480px) {
    font-size: 13px;
  }
`;

/* ---------- Auth Card ---------- */

export const AuthCard = styled.div`
  width: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px;

  border-radius: 22px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (max-width: 480px) {
    padding: 20px;
  }
`;