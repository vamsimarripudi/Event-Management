import styled from "styled-components";

/* ---------- Main Container ---------- */

export const Container = styled.div`
  flex: 1;
  min-height: 100vh;
  padding: 14px;
  margin-top: 10px;

  background: ${({ theme }) => theme.bg};

  transition: background 0.2s ease;

  @media screen and (min-width: 768px) {
    padding: 24px;
    margin-left: 220px;
    margin-top: 60px;
  }
`;

/* ---------- Tabs ---------- */

export const Tabs = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;

  z-index: 100;

  display: flex;
  align-items: center;

  gap: 8px;

  height: 60px;

  overflow-x: auto;

  padding: 10px 14px;

  background: ${({ theme }) => theme.bg};

  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-bottom: 1px solid ${({ theme }) => theme.border};

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 768px) {
    top: 60px;
    left: 220px;

    padding: 8px 16px;
  }
`;

export const TabButton = styled.button`
  border: none;
  outline: none;

  cursor: pointer;

  white-space: nowrap;

  padding: 10px 18px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  background: ${({ $active, theme }) =>
    $active ? "#6366f1" : theme.card};

  color: ${({ $active, theme }) =>
    $active ? "#ffffff" : theme.text};

  border: 1px solid
    ${({ $active, theme }) =>
      $active ? "#6366f1" : theme.border};

  transition: all 0.2s ease;

  &:active {
    transform: scale(0.96);
  }
`;

/* ---------- Page Layout ---------- */

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 50px;

  @media screen and (min-width: 768px) {
    margin-top: 5px;
  }
`;

/* ---------- Content Wrapper ---------- */

export const ContentWrapper = styled.div`
  min-height: 500px;

  padding: 14px;

  border-radius: 18px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (min-width: 768px) {
    padding: 20px;
  }
`;

/* ---------- New Badge ---------- */

export const NewBadge = styled.span`
  margin-left: 8px;

  padding: 3px 7px;

  border-radius: 999px;

  font-size: 10px;
  font-weight: 600;

  line-height: 1;

  background: linear-gradient(
    135deg,
    #6366f1,
    #4f46e5
  );

  color: #ffffff;
`;