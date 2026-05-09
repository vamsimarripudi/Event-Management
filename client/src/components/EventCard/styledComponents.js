import styled from "styled-components";

/* ---------- Shared Card Style ---------- */

const CardStyle = `
  width: 100%;

  padding: 16px;
  margin-bottom: 18px;

  border-radius: 18px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media screen and (min-width: 768px) {
    padding: 20px;
  }
`;

/* ---------- Main Event Card ---------- */

export const EventCardContainer = styled.div`
  ${CardStyle}
`;

export const EventItem = styled.div`
  ${CardStyle}
`;

export const EventItemContainer = styled.div`
  ${CardStyle}
`;

/* ---------- Titles ---------- */

export const EventCardTitle = styled.h2`
  margin-bottom: 10px;

  font-size: 22px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  line-height: 1.4;
`;

export const EventItemTitle = styled.h2`
  margin-bottom: 10px;

  font-size: 22px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  line-height: 1.4;
`;

/* ---------- Event Info ---------- */

export const EventCardDate = styled.p`
  margin-bottom: 14px;

  color: #6366f1;

  font-size: 14px;
  font-weight: 600;
`;

export const EventDescription = styled.p`
  margin-bottom: 16px;

  color: ${({ theme }) => theme.text};

  font-size: 15px;
  line-height: 1.7;
`;

export const EventState = styled.p`
  margin-bottom: 8px;

  color: ${({ theme }) => theme.mutedText};

  font-size: 14px;
`;

export const EventVenue = styled.p`
  margin-bottom: 8px;

  color: ${({ theme }) => theme.mutedText};

  font-size: 14px;
`;

export const EventCountry = styled.p`
  margin-bottom: 8px;

  color: ${({ theme }) => theme.mutedText};

  font-size: 14px;
`;

export const EventCategory = styled.p`
  margin-bottom: 10px;

  color: ${({ theme }) => theme.mutedText};

  font-size: 14px;
`;

/* ---------- Buttons ---------- */

const ButtonStyle = `
  border: none;
  outline: none;

  cursor: pointer;

  padding: 10px 16px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  background: #6366f1;
  color: #ffffff;

  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const EventCardRegisterButton = styled.button`
  ${ButtonStyle}
`;

export const EventViewDetailsButton = styled.button`
  ${ButtonStyle}
`;