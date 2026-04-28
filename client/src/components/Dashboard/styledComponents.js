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

/* Header */

export const Header = styled.h2`
  margin-bottom: 20px;
`;

export const UserName = styled.span`
  color: #2563eb;
  font-weight: 600;
`;

/* Grid */

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

/* Card */

export const Card = styled.div`
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0,0,0,0.06);
`;

export const Title = styled.h3`
  margin-bottom: 6px;
`;

export const Meta = styled.p`
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
`;

export const Badge = styled.span`
  display: inline-block;
  font-size: 11px;
  background: #e0f2fe;
  color: #0369a1;
  padding: 3px 8px;
  border-radius: 6px;
  margin-bottom: 6px;
`;

/* Skeleton */

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const Skeleton = styled.div`
  height: ${(p) => p.height || "14px"};
  width: ${(p) => p.width || "100%"};
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

/* Container */

export const NoEventsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: calc(100vh - 120px);
  padding: 24px;

  text-align: center;
`;

/* Image */

export const NoEventsFoundImage = styled.img`
  width: 100%;
  max-width: 420px;
  height: auto;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    max-width: 260px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
  }
`;

/* Title */

export const NoEventsTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

/* Subtitle */

export const NoEventsText = styled.p`
  font-size: 14px;
  color: #64748b;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const EventsButton = styled.button`
  margin-top: 20px;
  padding: 10px 18px;

  background: #2563eb;
  color: #ffffff;

  border: none;
  border-radius: 8px;

  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1d4ed8;
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 260px;
    font-size: 13px;
    padding: 10px;
  }
`;