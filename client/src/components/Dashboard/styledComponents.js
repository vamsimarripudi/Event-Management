import styled from "styled-components";

/* Container (your existing wrapper can stay) */
export const Container = styled.div`
  flex: 1;
  padding: 24px;
  background:${({theme}) => theme.bg};
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
  position: fixed;
  top: 60px; /* adjust to your header height */
  left: 220px; /* desktop sidebar width */
  right: 0;
  z-index: 100;
  
  display: flex;
  gap: 10px;
  padding: 8px 16px;
  background:${({theme}) => theme.bg}
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  overflow-x: auto;
  height: 50px;

  @media (max-width: 768px) {
    left: 0; /* no sidebar on mobile */
    gap: 8px;
    margin-top:50px;
    
    
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
  background:${({theme}) => theme.card};
  border-radius: 14px;
  padding: 20px;
  
  min-height: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);

  @media (max-width: 768px) {
    padding: 14px;
    margin-top:60px;
    
  }
`;

export const Layout = styled.div`
  display: flex;

  @media (max-width: 768px) {
  margin-top:80px;
    flex-direction: column;
  }
`;

export const NewBadge = styled.span`
  margin-left: 8px;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;

  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #fff;
  
  line-height: 1;
`;