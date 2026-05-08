import styled, { keyframes, css } from "styled-components";

/* ---------- Animations ---------- */
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

/* ---------- Page ---------- */
export const Page = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};

  display: flex;
  justify-content: center;
`;

/* ---------- Card ---------- */
export const Card = styled.div`
  width: 100%;
  max-width: 640px;

  padding: 24px;
  border-radius: 20px;

  background: ${({theme}) => theme.card};
  backdrop-filter: blur(12px);

  border: 1px solid rgba(255,255,255,0.2);

  box-shadow: 0 20px 40px rgba(0,0,0,0.08);

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 30px 60px rgba(0,0,0,0.12);
  }
`;

/* ---------- Header ---------- */
export const Header = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
`;

/* ---------- Avatar ---------- */
export const AvatarWrap = styled.div`
  cursor: pointer;
  position: relative;

  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.06);
    box-shadow: 0 0 0 4px rgba(99,102,241,0.15);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Avatar = styled.img`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;

  border: 3px solid white;
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
`;

/* ---------- Text ---------- */
export const Name = styled.h3`
  margin: 0;
  font-size: 20px;
`;

export const SubText = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.subText};
`;

/* ---------- Form ---------- */
export const Field = styled.div`
  margin-bottom: 16px;
`;

export const Label = styled.p`
  font-size: 13px;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};

  transition: all 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};

  transition: all 0.2s ease;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.2);
  }
`;

/* ---------- Buttons ---------- */
export const Row = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 14px;
`;

export const PrimaryBtn = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  border: none;

  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(99,102,241,0.25);
  }

  &:active {
    transform: scale(0.96);
    box-shadow: 0 4px 10px rgba(99,102,241,0.2);
  }
`;

export const GhostBtn = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;

  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};

  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({theme}) => theme.text};
  &:hover {
    background: rgba(99,102,241,0.06);
    border-color: #6366f1;
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const DangerBtn = styled(PrimaryBtn)`
  background: linear-gradient(135deg, #ef4444, #dc2626);

  &:hover {
    box-shadow: 0 10px 20px rgba(239,68,68,0.25);
  }
`;

/* ---------- Overlay ---------- */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${fadeIn} 0.2s ease;
`;

/* ---------- Action Sheet ---------- */
export const ActionSheet = styled.div`
  width: 280px;
  padding: 16px;

  background: ${({ theme }) => theme.card};
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  animation: ${scaleIn} 0.2s ease;
`;

export const SheetBtn = styled.button`
  padding: 12px;
  border-radius: 10px;
  border: none;

  background: ${({ $danger }) => ($danger ? "#fee2e2" : "#f1f5f9")};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ danger }) =>
      danger ? "#fecaca" : "#e2e8f0"};
  }

  &:active {
    transform: scale(0.96);
  }
`;
/* ---------- Full Image ---------- */
export const FullImage = styled.img`
  max-width: 90%;
  border-radius: 12px;
`;

/* ---------- Modal ---------- */
export const Modal = styled.div`
  width: 320px;
  padding: 20px;

  background: ${({ theme }) => theme.card};
  border-radius: 14px;

  animation: ${scaleIn} 0.2s ease;
`;

export const ModalTitle = styled.h4`
  margin-bottom: 12px;
`;

export const ModalRow = styled.div`
  display: flex;
  gap: 10px;
`;

/* ---------- Skeleton ---------- */
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

export const SkeletonCard = styled.div`
  height: 60px;
  border-radius: 12px;
  margin-top: 12px;
  ${shimmerBase}
`;

export const SkeletonAvatar = styled.div`
  width: 88px;
  height: 88px;
  border-radius: 50%;
  ${shimmerBase}
`;

export const SkeletonLine = styled.div`
  height: 10px;
  width: ${({ width }) => width || "100%"};
  margin-top: 6px;
  border-radius: 6px;
  ${shimmerBase}
`;

/* ---------- Error ---------- */
export const ErrorBox = styled.p`
  color: #ef4444;
  font-weight: 500;
`;

export const StrengthCard = styled.div`
  padding: 20px;
  border-radius: 18px;
  background: rgba(99, 102, 241, 0.08);
  width: 100%;
  box-sizing: border-box;
  margin-bottom:10px;
  @media screen and (max-width: 768px) {
    padding: 16px;
    border-radius: 16px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: #e5e7eb;
  overflow: hidden;
  margin: 12px 0;

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

export const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const AnalysisCard = styled.div`
  padding: 20px;
  border-radius: 18px;
  background: ${({ theme }) => theme.bg};

  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  box-sizing: border-box;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);

  @media screen and (max-width: 768px) {
    padding: 16px;
    border-radius: 16px;
  }
`;

export const Value = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  word-break: break-word;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`;

export const SummaryCard = styled.div`
  padding: 22px;
  border-radius: 18px;

  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.1),
    rgba(79, 70, 229, 0.05)
  );

  width: 100%;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 18px;
    border-radius: 16px;
  }
`;

export const SummaryText = styled.p`
  line-height: 1.7;
  margin-top: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;