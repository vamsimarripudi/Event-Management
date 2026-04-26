import styled, { keyframes } from "styled-components";

export const DashboardContainer = styled.div`
 display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    min-height: 100vh;
    background: #f4f6fa;
    padding-left: 220px; /* Space for sidebar */
    padding-top: 64px; /* Space for navbar */
    @media (max-width: 768px) {
        flex-direction: column;
        padding-left: 0;
        padding-top: 80px;
    }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 24px;
`;

export const Section = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
  color: #1e293b;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

export const Card = styled.div`
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.06);
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 6px;
`;

export const Meta = styled.p`
  font-size: 13px;
  color: #64748b;
`;

export const Badge = styled.span`
  display: inline-block;
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: 6px;

  background: ${({ status }) =>
    status === "UPCOMING"
      ? "#e0f2fe"
      : status === "ONGOING"
      ? "#dcfce7"
      : "#fee2e2"};

  color: ${({ status }) =>
    status === "UPCOMING"
      ? "#0369a1"
      : status === "ONGOING"
      ? "#166534"
      : "#991b1b"};
`;

export const EmptyState = styled.p`
  color: #64748b;
`;

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const Skeleton = styled.div`
  height: ${(p) => p.height || "14px"};
  width: ${(p) => p.width || "100%"};
  border-radius: 6px;
  margin-bottom: 8px;

  background: #e2e8f0;
  background-image: linear-gradient(
    to right,
    #e2e8f0 0%,
    #f1f5f9 20%,
    #e2e8f0 40%,
    #e2e8f0 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s infinite;
`;