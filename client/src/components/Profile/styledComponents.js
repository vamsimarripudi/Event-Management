import styled, { keyframes, css } from "styled-components";

/* ---------- Page ---------- */
export const Page = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

/* ---------- Card ---------- */
export const Card = styled.div`
  max-width: 720px;
  margin: 0 auto;
  background: ${({ theme }) => theme.card};
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

/* ---------- Header ---------- */
export const Header = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

/* ---------- Avatar ---------- */
export const AvatarWrap = styled.div`
  position: relative;
  cursor: pointer;
`;

export const AvatarRing = styled.div`
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(45deg, #6366f1, #22c55e);
  z-index: 0;
`;

export const Avatar = styled.img`
  position: relative;
  z-index: 1;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
`;

/* ---------- Text ---------- */
export const Name = styled.h3`
  margin: 0;
`;

export const SubText = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.subText};
  font-size: 14px;
`;

/* ---------- Stats ---------- */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.background};
  text-align: center;
`;

export const StatValue = styled.h2`
  margin: 0;
`;

export const StatLabel = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.subText};
`;

/* ---------- Buttons ---------- */
export const ActionsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

export const PrimaryBtn = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background: #6366f1;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`;

export const GhostBtn = styled.button`
  flex: 1;
  padding: 10px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  cursor: pointer;
`;

export const DangerBtn = styled(PrimaryBtn)`
  background: #ef4444;
`;

/* ---------- Overlay ---------- */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* ---------- Action Sheet ---------- */
export const ActionSheet = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 16px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  max-width: 300px;
`;

export const SheetBtn = styled.button`
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background: ${({ danger }) => (danger ? "#fee2e2" : "#f1f5f9")};
`;

/* ---------- Full Image ---------- */
export const FullImage = styled.img`
  width: 90%;
  max-width: 400px;
  border-radius: 12px;
`;

/* ---------- Modal ---------- */
export const Modal = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 20px;
  border-radius: 14px;
  text-align: center;
`;

export const ModalTitle = styled.h4`
  margin-bottom: 12px;
`;

export const ModalRow = styled.div`
  display: flex;
  gap: 10px;
`;

/* ---------- Skeleton ---------- */
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

/* ✅ FIXED: use css helper instead of plain string */
const base = css`
  background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 37%, #e5e7eb 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export const SkeletonCard = styled.div`
  height: 70px;
  border-radius: 12px;
  ${base}
`;

export const SkeletonAvatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  ${base}
`;

export const SkeletonLine = styled.div`
  height: ${({ height }) => height || "12px"};
  width: ${({ width }) => width || "100%"};
  border-radius: 6px;
  margin-top: 6px;
  ${base}
`;