import styled, { keyframes, css } from "styled-components";

/* ---------- Animations ---------- */

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }

  100% {
    background-position: 400px 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

/* ---------- Shared Styles ---------- */

const shimmerBase = css`
  background: linear-gradient(
    90deg,
    #e5e7eb 25%,
    #f3f4f6 37%,
    #e5e7eb 63%
  );

  background-size: 400% 100%;

  animation: ${shimmer} 1.2s infinite linear;
`;

/* ---------- Page ---------- */

export const Page = styled.div`
  min-height: 100vh;

  display: flex;
  justify-content: center;

  padding: 14px;

  background: ${({ theme }) => theme.bg};

  @media screen and (min-width: 768px) {
    padding: 24px;
  }
`;

/* ---------- Card ---------- */

export const Card = styled.div`
  width: 100%;
  max-width: 640px;

  padding: 20px;

  border-radius: 22px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  backdrop-filter: blur(12px);

  transition: 0.25s ease;

  @media screen and (min-width: 768px) {
    padding: 24px;
  }

  &:hover {
    transform: translateY(-2px);
  }
`;

/* ---------- Header ---------- */

export const Header = styled.div`
  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

/* ---------- Avatar ---------- */

export const AvatarWrap = styled.div`
  position: relative;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const Avatar = styled.img`
  width: 88px;
  height: 88px;

  border-radius: 50%;

  object-fit: cover;

  border: 3px solid ${({ theme }) => theme.card};

  box-shadow: 0 6px 16px rgba(0,0,0,0.15);

  @media screen and (max-width: 480px) {
    width: 74px;
    height: 74px;
  }
`;

/* ---------- Typography ---------- */

export const Name = styled.h3`
  margin: 0;

  font-size: 22px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};
`;

export const SubText = styled.p`
  margin-top: 4px;

  font-size: 13px;
  line-height: 1.5;

  color: ${({ theme }) => theme.mutedText};
`;

export const Label = styled.p`
  margin-bottom: 6px;

  font-size: 13px;
  font-weight: 500;

  color: ${({ theme }) => theme.text};
`;

/* ---------- Form ---------- */

export const Field = styled.div`
  margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;

  padding: 12px 14px;

  border-radius: 12px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  transition: 0.2s ease;

  &:focus {
    outline: none;

    border-color: #6366f1;

    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
`;

export const Select = styled.select`
  width: 100%;

  padding: 12px 14px;

  border-radius: 12px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  transition: 0.2s ease;

  &:focus {
    outline: none;

    border-color: #6366f1;

    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
`;

/* ---------- Buttons ---------- */

export const Row = styled.div`
  display: flex;

  gap: 12px;

  margin-top: 14px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const PrimaryBtn = styled.button`
  flex: 1;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 12px;

  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #6366f1,
    #4f46e5
  );

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 10px 20px rgba(99,102,241,0.25);
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const GhostBtn = styled.button`
  flex: 1;

  border-radius: 12px;

  border: 1px solid ${({ theme }) => theme.border};

  background: transparent;

  color: ${({ theme }) => theme.text};

  padding: 12px;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    background: rgba(99,102,241,0.06);

    border-color: #6366f1;
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const DangerBtn = styled(PrimaryBtn)`
  background: linear-gradient(
    135deg,
    #ef4444,
    #dc2626
  );

  &:hover {
    box-shadow: 0 10px 20px rgba(239,68,68,0.25);
  }
`;

/* ---------- Overlay ---------- */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0,0,0,0.5);

  padding: 16px;

  z-index: 1000;

  animation: ${fadeIn} 0.2s ease;
`;

/* ---------- Action Sheet ---------- */

export const ActionSheet = styled.div`
  width: 90%;
  max-width: 280px;

  padding: 16px;

  border-radius: 16px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  display: flex;
  flex-direction: column;

  gap: 10px;

  animation: ${scaleIn} 0.2s ease;
`;

export const SheetBtn = styled.button`
  padding: 12px;

  border: none;
  outline: none;

  border-radius: 10px;

  background: ${({ $danger }) =>
    $danger
      ? "rgba(239,68,68,0.12)"
      : "rgba(99,102,241,0.08)"};

  color: ${({ theme, $danger }) =>
    $danger ? "#ef4444" : theme.text};

  font-weight: 500;

  cursor: pointer;

  transition: 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.97);
  }
`;

/* ---------- Full Image ---------- */

export const FullImage = styled.img`
  width: 100%;
  max-width: 90vw;

  border-radius: 14px;

  object-fit: cover;
`;

/* ---------- Modal ---------- */

export const Modal = styled.div`
  width: 90%;
  max-width: 320px;

  padding: 20px;

  border-radius: 18px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  animation: ${scaleIn} 0.2s ease;
`;

export const ModalTitle = styled.h4`
  margin-bottom: 12px;

  color: ${({ theme }) => theme.text};
`;

export const ModalRow = styled.div`
  display: flex;

  gap: 10px;
`;

/* ---------- Skeleton ---------- */

/* ---------- Skeleton ---------- */

export const SkeletonCard = styled.div`
  width: 100%;
  height: 60px;

  margin-top: 12px;

  border-radius: 12px;

  ${shimmerBase}
`;

export const SkeletonAvatar = styled.div`
  width: 88px;
  height: 88px;

  border-radius: 50%;

  flex-shrink: 0;

  ${shimmerBase}
`;

export const SkeletonLine = styled.div`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "10px"};

  margin-top: 6px;

  border-radius: 6px;

  ${shimmerBase}
`;

export const SkeletonButton = styled.div`
  width: ${({ width }) => width || "120px"};
  height: 44px;

  border-radius: 12px;

  ${shimmerBase}
`;

export const SkeletonTag = styled.div`
  width: ${({ width }) => width || "70px"};
  height: 28px;

  border-radius: 999px;

  ${shimmerBase}
`;

export const SkeletonInput = styled.div`
  width: 100%;
  height: 48px;

  border-radius: 12px;

  ${shimmerBase}
`;

export const SkeletonTextarea = styled.div`
  width: 100%;
  height: 120px;

  border-radius: 16px;

  ${shimmerBase}
`;

export const SkeletonStatCard = styled.div`
  width: 100%;
  min-height: 110px;

  padding: 18px;

  border-radius: 18px;

  ${shimmerBase}
`;

export const SkeletonCardLarge = styled.div`
  width: 100%;
  height: 180px;

  border-radius: 20px;

  ${shimmerBase}
`;

export const SkeletonCircle = styled.div`
  width: ${({ size }) => size || "48px"};
  height: ${({ size }) => size || "48px"};

  border-radius: 50%;

  ${shimmerBase}
`;

export const SkeletonRow = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  margin-top: 12px;

  flex-wrap: wrap;
`;

export const SkeletonGrid = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: 1fr;

  gap: 14px;

  margin-top: 18px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SkeletonAnalysisCard = styled.div`
  width: 100%;

  padding: 18px;

  border-radius: 18px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  ${shimmerBase}
`;

export const SkeletonHeader = styled.div`
  display: flex;
  align-items: center;

  gap: 14px;

  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SkeletonContent = styled.div`
  flex: 1;

  width: 100%;
`;

export const SkeletonTags = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  flex-wrap: wrap;

  margin-top: 14px;
`;

export const SkeletonButtons = styled.div`
  display: flex;

  gap: 12px;

  margin-top: 18px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SkeletonSummary = styled.div`
  width: 100%;

  padding: 22px;

  border-radius: 18px;

  ${shimmerBase}
`;

export const SkeletonProfileCard = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 22px;
  ${shimmerBase}
`;

export const SkeletonModal = styled.div`
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 18px;
  ${shimmerBase}
`;

/* ---------- Error ---------- */

export const ErrorBox = styled.p`
  color: #ef4444;

  font-weight: 500;
`;

/* ---------- Strength ---------- */

export const StrengthCard = styled.div`
  width: 100%;

  padding: 18px;

  margin-bottom: 10px;

  border-radius: 18px;

  background: rgba(99, 102, 241, 0.08);

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;

  overflow: hidden;

  margin: 12px 0;

  border-radius: 999px;

  background: #e5e7eb;

  @media screen and (max-width: 768px) {
    height: 8px;
  }
`;

export const Progress = styled.div`
  width: ${({ value }) => value}%;

  height: 100%;

  border-radius: inherit;

  background: linear-gradient(
    90deg,
    #6366f1,
    #4f46e5
  );

  transition: width 0.4s ease;
`;

/* ---------- Analysis ---------- */

export const AnalysisGrid = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: 1fr;

  gap: 14px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const AnalysisCard = styled.div`
  width: 100%;

  padding: 18px;

  border-radius: 18px;

  background: ${({ theme }) => theme.bg};

  border: 1px solid ${({ theme }) => theme.border};

  display: flex;
  flex-direction: column;

  gap: 8px;

  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`;

export const Value = styled.h2`
  margin: 0;

  font-size: 28px;
  font-weight: 700;

  word-break: break-word;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

/* ---------- Summary ---------- */

export const SummaryCard = styled.div`
  width: 100%;

  padding: 22px;

  border-radius: 18px;

  background: linear-gradient(
    135deg,
    rgba(99,102,241,0.1),
    rgba(79,70,229,0.05)
  );

  @media screen and (max-width: 768px) {
    padding: 18px;
  }
`;

export const SummaryText = styled.p`
  margin-top: 10px;

  font-size: 15px;
  line-height: 1.7;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;