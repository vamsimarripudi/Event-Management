import styled from "styled-components";

/* ---------- Main Container ---------- */

export const NotFoundContainer = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  text-align: center;

  padding: 20px;

  background: ${({ theme }) => theme.bg};
`;

/* ---------- Typography ---------- */

export const NotFoundTitle = styled.h1`
  margin-bottom: 12px;

  font-size: 32px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 480px) {
    font-size: 26px;
  }
`;

export const NotFoundMessage = styled.p`
  max-width: 420px;

  margin-bottom: 20px;

  font-size: 15px;
  line-height: 1.7;

  color: ${({ theme }) => theme.mutedText};
`;

/* ---------- Image ---------- */

export const NotFoundImage = styled.img`
  width: 100%;
  max-width: 320px;

  margin-bottom: 24px;

  object-fit: contain;

  @media screen and (max-width: 480px) {
    max-width: 240px;
  }
`;

/* ---------- Button ---------- */

export const BackButton = styled.button`
  border: none;
  outline: none;

  cursor: pointer;

  padding: 12px 18px;

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
    transform: scale(0.97);
  }
`;