import styled from "styled-components";

/* ---------- Floating Button ---------- */

export const FloatingButton = styled.button`
  position: fixed;

  right: 16px;
  bottom: 16px;

  z-index: 999;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 12px 18px;

  border-radius: 12px;

  background: ${({ theme }) => theme.card};

  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.97);
  }

  @media screen and (min-width: 768px) {
    right: 20px;
    bottom: 20px;
  }
`;

/* ---------- Text ---------- */

export const RatingText = styled.div`
  margin-bottom: 10px;

  font-size: 13px;

  color: ${({ theme }) => theme.text};
`;

export const ErrorText = styled.div`
  margin-top: 6px;

  color: #ef4444;

  font-size: 12px;
`;

/* ---------- Modal ---------- */

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;

  padding: 20px;

  border-radius: 18px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (max-width: 768px) {
    position: fixed;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    width: 92%;

    z-index: 1000;
  }

  @media screen and (min-width: 768px) {
    padding: 24px;
  }
`;

/* ---------- Typography ---------- */

export const Title = styled.h3`
  margin-bottom: 18px;

  color: ${({ theme }) => theme.text};

  font-size: 20px;
`;

export const Label = styled.label`
  margin-top: 12px;

  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.text};
`;

/* ---------- Inputs ---------- */

export const Select = styled.select`
  width: 100%;

  margin-top: 6px;

  padding: 10px 12px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  outline: none;

  transition: 0.2s ease;

  &:focus {
    border-color: #6366f1;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;

  margin-top: 6px;

  padding: 12px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  resize: none;

  outline: none;

  transition: 0.2s ease;

  &:focus {
    border-color: #6366f1;
  }
`;

/* ---------- Buttons ---------- */

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 10px;

  margin-top: 20px;
`;

export const CancelBtn = styled.button`
  border: none;
  outline: none;

  cursor: pointer;

  padding: 10px 14px;

  border-radius: 10px;

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};

  font-size: 14px;
  font-weight: 500;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const SubmitBtn = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 10px;
  background: #6366f1;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s ease;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;