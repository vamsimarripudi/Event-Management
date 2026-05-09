import styled, { keyframes, css } from "styled-components";

/* ---------- Animation ---------- */

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }

  100% {
    background-position: 400px 0;
  }
`;

/* ---------- Reusable Styles ---------- */

const shimmerEffect = css`
  background-image: linear-gradient(
    to right,
    rgba(255,255,255,0.02) 0%,
    rgba(255,255,255,0.08) 20%,
    rgba(255,255,255,0.02) 40%,
    rgba(255,255,255,0.02) 100%
  );

  background-size: 800px 100%;

  animation: ${shimmer} 1.2s infinite linear;
`;

const ButtonStyle = css`
  border: none;
  outline: none;

  cursor: pointer;

  padding: 10px 16px;

  border-radius: 10px;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.97);
  }
`;

/* ---------- Layout ---------- */

export const EventDetailsContainer = styled.div`
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

export const ContentWrapper = styled.div`
  flex: 1;

  padding: 14px;

  @media screen and (min-width: 768px) {
    padding: 24px;
  }
`;

/* ---------- Event Card ---------- */

export const EventCard = styled.div`
  width: 100%;
  max-width: 900px;

  padding: 18px;

  border-radius: 20px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (min-width: 768px) {
    padding: 24px;
  }
`;

/* ---------- Typography ---------- */

export const Title = styled.h1`
  margin-bottom: 14px;

  font-size: 28px;
  line-height: 1.4;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 480px) {
    font-size: 22px;
  }
`;

export const Organizer = styled.p`
  margin-bottom: 14px;

  color: ${({ theme }) => theme.mutedText};

  font-size: 14px;
`;

export const Description = styled.p`
  margin: 18px 0;

  color: ${({ theme }) => theme.text};

  font-size: 15px;
  line-height: 1.7;
`;

/* ---------- Category ---------- */

export const Category = styled.span`
  display: inline-flex;
  align-items: center;

  padding: 6px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  background: rgba(99, 102, 241, 0.12);

  color: #6366f1;
`;

/* ---------- Location ---------- */

export const LocationContainer = styled.div`
  margin-bottom: 18px;
`;

export const Location = styled.p`
  color: ${({ theme }) => theme.mutedText};

  font-size: 14px;
  line-height: 1.5;
`;

/* ---------- Dates ---------- */

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  margin-bottom: 18px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
  }
`;

export const StartDate = styled.p`
  color: ${({ theme }) => theme.text};

  font-size: 14px;
`;

export const EndDate = styled.p`
  color: ${({ theme }) => theme.text};

  font-size: 14px;
`;

/* ---------- Capacity ---------- */

export const Capacity = styled.p`
  margin-bottom: 18px;

  color: ${({ theme }) => theme.text};

  font-size: 15px;
  font-weight: 500;
`;

/* ---------- Tags ---------- */

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 10px;

  margin: 20px 0;
`;

export const Tag = styled.span`
  padding: 6px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 500;

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  border: 1px solid ${({ theme }) => theme.border};
`;

/* ---------- Buttons ---------- */

export const RegisterButton = styled.button`
  ${ButtonStyle}

  background: #2563eb;
  color: #ffffff;

  margin-right: 10px;

  &:hover {
    opacity: 0.9;
  }
`;

export const DangerButton = styled(RegisterButton)`
  background: #dc2626;
`;

/* ---------- Status Badge ---------- */

export const StatusBadge = styled.span`
  margin-left: 10px;

  padding: 5px 10px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  background: ${({ status }) =>
    status === "UPCOMING"
      ? "rgba(59,130,246,0.12)"
      : status === "ONGOING"
      ? "rgba(34,197,94,0.12)"
      : "rgba(239,68,68,0.12)"};

  color: ${({ status }) =>
    status === "UPCOMING"
      ? "#2563eb"
      : status === "ONGOING"
      ? "#16a34a"
      : "#dc2626"};
`;

/* ---------- Skeleton ---------- */

export const Skeleton = styled.div`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "16px"};

  margin-bottom: 10px;

  border-radius: 8px;

  background: ${({ theme }) => theme.bg};

  ${shimmerEffect}
`;

/* ---------- Messages ---------- */

export const LoadingMessage = styled.p`
  margin-top: 12px;

  color: #ef4444;

  font-size: 14px;
`;

export const SuccessMessage = styled.p`
  margin-top: 12px;

  color: #22c55e;

  font-size: 14px;
`;