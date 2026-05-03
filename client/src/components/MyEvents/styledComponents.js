import styled from "styled-components";

/* Layout */
export const DashboardContainer = styled.div`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 14px;
  }
`;

/* Header */
export const Header = styled.h2`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 22px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const UserName = styled.span`
 background: linear-gradient(90deg, #4F46E5, #06B6D4);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
  font-weight: 800;
`;

/* Grid */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

/* Card */
export const Card = styled.div`
  background: #ffffff;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* Title */
export const Title = styled.h3`
  font-size: 17px;
  margin-bottom: 10px;
  color: #111;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* Badge */
export const Badge = styled.span`
  display: inline-block;
  background: #111;
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
`;

/* Meta */
export const Meta = styled.p`
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
`;

/* Button (with disabled support) */
export const Button = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  background: ${({ disabled }) => (disabled ? "#9ca3af" : "#ef4444")};
  color: #fff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: 0.2s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#9ca3af" : "#dc2626")};
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(0.97)")};
  }
`;

/* Center View */
export const CenterBox = styled.div`
  display: flex;
  flex-direction:column;
  height:100vh;
  justify-content: center;
  align-items: center;
`;

export const Message = styled.p`
  color: #666;
  font-size: 14px;
`;

/* Empty State */
export const NoEventsContainer = styled.div`
  text-align: center;
  padding: 40px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const NoEventsTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 18px;
`;

export const NoEventsText = styled.p`
  color: #777;
  margin-bottom: 16px;
  font-size: 14px;
`;