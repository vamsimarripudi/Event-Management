import styled from "styled-components";

/* ---------- Main Layout ---------- */

export const EventsContainer = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  padding-top: 80px;
  padding-left: 0;

  background: ${({ theme }) => theme.bg};

  @media screen and (min-width: 768px) {
    padding-left: 220px;
    padding-top: 64px;
  }
`;

/* ---------- Event Lists ---------- */

export const EventUnOrderedList = styled.ul`
  list-style: none;

  padding: 14px;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr;

  gap: 16px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const EventList = styled.ul`
  list-style: none;

  padding: 0;
  margin: 0;

  display: grid;
  grid-template-columns: 1fr;

  gap: 18px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

/* ---------- Event Card ---------- */

export const EventItem = styled.li`
  width: 100%;

  padding: 20px;

  border-radius: 20px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

/* ---------- Event Content ---------- */

export const EventTitle = styled.h2`
  margin-bottom: 10px;

  font-size: 22px;
  font-weight: 700;

  line-height: 1.4;

  color: ${({ theme }) => theme.text};
`;

export const EventDate = styled.p`
  margin-bottom: 16px;

  color: #6366f1;

  font-size: 14px;
  font-weight: 600;
`;

/* ---------- Buttons ---------- */

export const RegisterButton = styled.button`
  border: none;
  outline: none;

  cursor: pointer;

  padding: 10px 16px;

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

  &:active {
    transform: scale(0.97);
  }
`;

/* ---------- Filters ---------- */

export const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 14px;

  padding: 14px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
`;

/* ---------- Inputs ---------- */

export const SearchInput = styled.input`
  width: 100%;

  padding: 12px 14px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.card};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  transition: 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  @media screen and (min-width: 768px) {
    max-width: 400px;
  }
`;

export const Category = styled.select`
  width: 100%;

  padding: 12px 14px;

  border-radius: 10px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.card};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #6366f1;
  }

  @media screen and (min-width: 768px) {
    width: auto;
    min-width: 180px;
  }
`;

export const Option = styled.option`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
`;

/* ---------- Empty State ---------- */

export const NoEventsMessage = styled.p`
  margin-top: 40px;

  text-align: center;

  color: ${({ theme }) => theme.mutedText};

  font-size: 16px;
`;

/* ---------- Pagination ---------- */

export const PaginationCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 24px 0;
`;

export const PaginationCard = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;

export const Button = styled.button`
  border: none;
  outline: none;

  cursor: pointer;

  padding: 8px 14px;

  border-radius: 8px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  color: ${({ theme }) => theme.primary || "#6366f1"};

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;