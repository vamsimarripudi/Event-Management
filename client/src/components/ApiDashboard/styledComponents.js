
import styled, {keyframes,css,} from "styled-components";

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const shimmerEffect = css`
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.08) 37%,
    rgba(255,255,255,0.04) 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s infinite;
`;

export const Page = styled.div`
  min-height: 100vh;

  padding: 14px;

  background: ${({ theme }) => theme.bg};

  @media screen and (min-width:768px){
    padding:24px;
  }
`;

export const HeroSection = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;

  gap:20px;

  padding:24px;

  margin-bottom:24px;

  border-radius:24px;

  background:${({ theme }) => theme.card};

  border:1px solid ${({ theme }) => theme.border};

  box-shadow:${({ theme }) => theme.shadow};

  @media screen and (max-width:768px){
    flex-direction:column;
    align-items:flex-start;
  }
`;

export const HeroTitle = styled.h1`
  margin:0;

  font-size:32px;

  color:${({ theme }) => theme.text};
`;

export const HeroText = styled.p`
  color:${({ theme }) => theme.mutedText};
`;

export const LiveBadge = styled.div`
  display:flex;
  align-items:center;

  gap:10px;

  padding:10px 16px;

  border-radius:999px;

  background:rgba(34,197,94,0.12);

  color:#22c55e;

  font-weight:600;
`;

export const Pulse = styled.div`
  width:10px;
  height:10px;

  border-radius:50%;

  background:#22c55e;

  position:relative;

  &::after{
    content:"";

    position:absolute;
    inset:0;

    border-radius:50%;

    background:#22c55e;

    animation:${pulse} 1.5s infinite;
  }
`;

export const StatsGrid = styled.div`
  display:grid;

  grid-template-columns:1fr;

  gap:16px;

  margin-bottom:24px;

  @media screen and (min-width:768px){
    grid-template-columns:repeat(2,1fr);
  }

  @media screen and (min-width:1100px){
    grid-template-columns:repeat(4,1fr);
  }
`;

export const StatCard = styled.div`
  padding:22px;

  border-radius:20px;

  background:${({ theme }) => theme.card};

  border:1px solid ${({ theme }) => theme.border};

  box-shadow:${({ theme }) => theme.shadow};
`;

export const StatLabel = styled.p`
  color:${({ theme }) => theme.mutedText};
`;

export const StatValue = styled.h2`
  margin-top:10px;

  font-size:32px;

  color:${({ theme }) => theme.text};
`;

export const ChartGrid = styled.div`
  display:grid;

  grid-template-columns:1fr;

  gap:20px;

  margin-bottom:24px;

  @media screen and (min-width:1100px){
    grid-template-columns:1fr 1fr;
  }
`;

export const ChartCard = styled.div`
  padding:22px;

  border-radius:22px;

  background:${({ theme }) => theme.card};

  border:1px solid ${({ theme }) => theme.border};

  box-shadow:${({ theme }) => theme.shadow};
`;

export const SectionTitle = styled.h3`
  margin-bottom:20px;

  color:${({ theme }) => theme.text};
`;

export const BottomGrid = styled.div`
  display:grid;

  grid-template-columns:1fr;

  gap:20px;

  @media screen and (min-width:1200px){
    grid-template-columns:2fr 1fr;
  }
`;

export const TableCard = styled.div`
  overflow:auto;

  padding:22px;

  border-radius:22px;

  background:${({ theme }) => theme.card};

  border:1px solid ${({ theme }) => theme.border};

  box-shadow:${({ theme }) => theme.shadow};
`;

export const Table = styled.table`
  width:100%;

  border-collapse:collapse;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom:1px solid ${({ theme }) => theme.border};
`;

export const Th = styled.th`
  padding:14px;

  text-align:left;

  color:${({ theme }) => theme.mutedText};
`;

export const Td = styled.td`
  padding:14px;

  color:${({ theme }) => theme.text};
`;

export const MethodBadge = styled.div`
  display:inline-flex;

  padding:6px 12px;

  border-radius:999px;

  font-size:12px;

  font-weight:600;

  background:${({ method }) => {
    switch(method){
      case "GET":
        return "rgba(59,130,246,0.12)";
      case "POST":
        return "rgba(34,197,94,0.12)";
      case "PUT":
        return "rgba(245,158,11,0.12)";
      default:
        return "rgba(239,68,68,0.12)";
    }
  }};

  color:${({ method }) => {
    switch(method){
      case "GET":
        return "#3b82f6";
      case "POST":
        return "#22c55e";
      case "PUT":
        return "#f59e0b";
      default:
        return "#ef4444";
    }
  }};
`;

export const StatusBadge = styled.div`
  display:inline-flex;

  padding:6px 12px;

  border-radius:999px;

  background:${({ color }) => `${color}20`};

  color:${({ color }) => color};

  font-weight:600;
`;

export const SlowGrid = styled.div`
  display:flex;
  flex-direction:column;

  gap:16px;
`;

export const SlowCard = styled.div`
  padding:20px;

  border-radius:18px;

  background:rgba(239,68,68,0.08);

  border:1px solid rgba(239,68,68,0.25);

  h4{
    color:${({ theme }) => theme.text};
  }

  p{
    color:#ef4444;
  }
`;

export const LoaderCard = styled.div`
  padding:22px;

  border-radius:22px;

  background:${({ theme }) => theme.card};

  border:1px solid ${({ theme }) => theme.border};
`;

export const Skeleton = styled.div`
  width:${({ width }) => width || "100%"};
  height:${({ height }) => height || "20px"};

  margin-bottom:12px;

  border-radius:12px;

  ${shimmerEffect}
`;

export const FailureCard = styled.div`
  min-height:80vh;

  display:flex;
  flex-direction:column;

  justify-content:center;
  align-items:center;

  gap:20px;

  color:${({ theme }) => theme.text};
`;

export const RetryButton = styled.button`
  border:none;

  padding:12px 20px;

  border-radius:12px;

  background:#6366f1;

  color:white;

  cursor:pointer;
`;

export const SearchInput = styled.input`
  width:100%;

  padding:12px 14px;

  margin-bottom:20px;

  border-radius:12px;

  border:1px solid ${({ theme }) => theme.border};

  background:${({ theme }) => theme.bg};

  color:${({ theme }) => theme.text};
`;



