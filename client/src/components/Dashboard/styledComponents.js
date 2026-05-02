import styled from "styled-components";

/* Container (your existing wrapper can stay) */
export const Container = styled.div`
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
  margin-left:220px;
  margin-top:60px;
  @media (max-width: 768px) {
    padding: 14px;
    margin-left:10px;
    margin-top:10px;
  }
`;

/* Tabs (top, keep same behavior) */
export const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const TabButton = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  background: ${({ $active }) => ($active ? "#111" : "#e5e7eb")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};

  transition: all 0.2s;

  &:active {
    transform: scale(0.96);
  }
`;

/* Content wrapper */
export const ContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
  min-height: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);

  @media (max-width: 768px) {
    padding: 14px;
  }
`;

export const Layout = styled.div`
  display: flex;

  @media (max-width: 768px) {
  margin-top:80px;
    flex-direction: column;
  }
`;