import styled from "styled-components";

/* ---------- Layout ---------- */

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;

  background: ${({ theme }) => theme.bg};

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;

  min-height: 100vh;

  padding: 14px;

  background: ${({ theme }) => theme.bg};

  @media screen and (min-width: 768px) {
    padding: 24px;
  }
`;

/* ---------- Header ---------- */

export const Header = styled.h2`
  margin-bottom: 20px;

  font-size: 22px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export const UserName = styled.span`
  font-weight: 800;

  background: linear-gradient(
    90deg,
    #6366f1,
    #06b6d4
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

/* ---------- Grid ---------- */

export const Grid = styled.div`
  display: grid;

  grid-template-columns: 1fr;

  gap: 16px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    );

    gap: 20px;
  }
`;

/* ---------- Card ---------- */

export const Card = styled.div`
  padding: 18px;

  border-radius: 20px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* ---------- Typography ---------- */

export const Title = styled.h3`
  margin-bottom: 10px;

  font-size: 17px;
  font-weight: 600;

  color: ${({ theme }) => theme.text};

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const Meta = styled.p`
  margin-bottom: 6px;

  font-size: 13px;
  line-height: 1.6;

  color: ${({ theme }) => theme.mutedText};
`;

export const Message = styled.p`
  font-size: 14px;

  color: ${({ theme }) => theme.text};
`;

/* ---------- Badge ---------- */

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;

  margin-bottom: 12px;

  padding: 5px 10px;

  border-radius: 999px;

  background: rgba(99, 102, 241, 0.12);

  color: #6366f1;

  font-size: 12px;
  font-weight: 600;
`;

/* ---------- Button ---------- */

export const Button = styled.button`
  width: 100%;

  margin-top: 14px;

  border: none;
  outline: none;

  cursor: ${({ disabled }) =>
    disabled ? "not-allowed" : "pointer"};

  padding: 12px;

  border-radius: 12px;

  background: ${({ disabled }) =>
    disabled ? "#9ca3af" : "#ef4444"};

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "#9ca3af" : "#dc2626"};
  }

  &:active {
    transform: ${({ disabled }) =>
      disabled ? "none" : "scale(0.98)"};
  }
`;

/* ---------- Center View ---------- */

export const CenterBox = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  text-align: center;

  padding: 20px;
`;

/* ---------- Empty State ---------- */

export const NoEventsContainer = styled.div`
  padding: 32px 20px;

  border-radius: 20px;

  text-align: center;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  @media screen and (max-width: 768px) {
    padding: 24px 16px;
  }
`;

export const NoEventsTitle = styled.h3`
  margin-bottom: 10px;

  font-size: 20px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};
`;

export const NoEventsText = styled.p`
  font-size: 14px;
  line-height: 1.6;

  color: ${({ theme }) => theme.mutedText};
`;