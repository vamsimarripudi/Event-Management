import styled, { keyframes } from "styled-components";

/* Layout */

export const EventDetailsContainer = styled.div`
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

export const EventCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  max-width: 900px;
`;

/* Typography */

export const Title = styled.h1`
  font-size: 26px;
  margin-bottom: 12px;
`;

export const Organizer = styled.p`
  color: #475569;
`;

export const Category = styled.span`
  background: #e0f2fe;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
`;

export const Description = styled.p`
  margin: 16px 0;
`;

/* Location */

export const LocationContainer = styled.div`
  margin-bottom: 16px;
`;

export const Location = styled.p`
  color: #64748b;
`;

/* Date */

export const DateContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
`;

export const StartDate = styled.p``;
export const EndDate = styled.p``;

/* Capacity */

export const Capacity = styled.p`
  font-weight: 500;
`;

/* Tags */

export const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
`;

export const Tag = styled.span`
  background: #e2e8f0;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
`;

/* Buttons */

export const RegisterButton = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;

  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled(RegisterButton)`
  background: #dc2626;

  &:hover {
    background: #b91c1c;
  }
`;

/* Status Badge */

export const StatusBadge = styled.span`
  margin-left: 10px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;

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

/* Skeleton */

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const Skeleton = styled.div`
  height: ${(p) => p.height || "16px"};
  width: ${(p) => p.width || "100%"};
  border-radius: 6px;
  margin-bottom: 10px;

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

/* Loading */

export const LoadingMessage = styled.p`
  text-align: center;
  margin-top: 40px;
`;