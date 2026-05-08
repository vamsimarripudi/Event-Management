import styled from "styled-components";

/* ---------- Layout ---------- */
export const Container = styled.div`
background:${({theme}) => theme.bg}
  padding: 20px;
`;

export const TopBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const FilterButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  background: ${({ active }) =>
    active ? "#6366f1" : "#e5e7eb"};
  color: ${({ active }) => (active ? "#fff" : "#000")};
`;

/* ---------- Cards ---------- */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

export const Card = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.card};
`;

export const Title = styled.p`
  color:${({theme}) => theme.text}
  font-size: 13px;
`;

export const StatValue = styled.h2`
color:${({theme}) => theme.text}
  margin: 4px 0;
`;

/* ---------- Sections ---------- */
export const Section = styled.div`
background:${({theme}) => theme.card}
  margin-top: 24px;
`;

export const SectionTitle = styled.h3`
color:${({theme}) => theme.text}
  margin-bottom: 12px;
`;

/* ---------- Chart ---------- */
export const ChartWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 100px;
background:${({theme}) => theme.card}
`;

export const ChartPoint = styled.div`
background:${({theme}) => theme.card}
  width: 10px;
  background: #6366f1;
  border-radius: 4px;
`;

export const ChartLine = styled.div`
background:${({theme}) => theme.card}
  position: absolute;
`;

/* ---------- Bars ---------- */
export const BarRow = styled.div`
  margin-bottom: 10px;
`;

export const BarLabel = styled.p`
  font-size: 13px;
`;

export const BarTrack = styled.div`
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
`;

export const BarFill = styled.div`
  height: 100%;
  width: ${({ value }) => value}%;
  background: #6366f1;
  border-radius: 4px;
`;
