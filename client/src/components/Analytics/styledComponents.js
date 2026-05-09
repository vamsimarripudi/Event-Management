import styled from "styled-components";

/* ---------- Main Container ---------- */

export const Container = styled.div`
  min-height: 100vh;
  padding: 16px;
  background: ${({ theme }) => theme.bg};
  margin-top:60px;

  @media screen and (min-width: 768px) {
    padding: 24px;
    margin-top:50px;
  }

  @media screen and (min-width: 1024px) {
    padding: 32px;
  }
`;

/* ---------- Top Filter Section ---------- */

export const TopBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const FilterButton = styled.button`
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  background: ${({ active, theme }) =>
    active ? "#6366f1" : theme.card};

  color: ${({ active, theme }) =>
    active ? "#ffffff" : theme.text};

  border: 1px solid ${({ theme }) => theme.border};

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

/* ---------- Stats Grid ---------- */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Card = styled.div`
  padding: 18px;
  border-radius: 18px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};
`;

export const Title = styled.p`
  margin: 0;
  font-size: 13px;

  color: ${({ theme }) => theme.mutedText};
`;

export const StatValue = styled.h2`
  margin-top: 8px;
  font-size: 28px;

  color: ${({ theme }) => theme.text};
`;

/* ---------- Section Wrapper ---------- */

export const Section = styled.div`
  margin-top: 24px;
  padding: 18px;

  border-radius: 18px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};
`;

export const SectionTitle = styled.h3`
  margin-bottom: 16px;

  color: ${({ theme }) => theme.text};
`;

/* ---------- Chart ---------- */

export const ChartWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  height: 140px;
`;

export const ChartPoint = styled.div`
  width: 12px;
  border-radius: 20px;

  background: #6366f1;

  height: ${({ height }) => height || "40px"};

  @media screen and (min-width: 768px) {
    width: 14px;
  }
`;

export const ChartLine = styled.div`
  position: absolute;
`;

/* ---------- Progress Bars ---------- */

export const BarRow = styled.div`
  margin-bottom: 16px;
`;

export const BarLabel = styled.p`
  margin-bottom: 8px;
  font-size: 13px;

  color: ${({ theme }) => theme.text};
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 10px;

  border-radius: 999px;
  overflow: hidden;

  background: ${({ theme }) => theme.track};
`;

export const BarFill = styled.div`
  height: 100%;
  width: ${({ value }) => value}%;

  border-radius: inherit;

  background: #6366f1;
`;