import styled, { keyframes, css } from "styled-components";

/* ---------- Animations ---------- */
export const pulse = keyframes`
0% {
box-shadow: 0 0 0 0 rgba(99,102,241,0.45);
}
70% {
box-shadow: 0 0 0 14px rgba(99,102,241,0);
}
100% {
box-shadow: 0 0 0 0 rgba(99,102,241,0);
}
`;

export const ripple = keyframes`
0% {
transform: scale(0.6);
opacity: 0.6;
}
100% {
transform: scale(2.5);
opacity: 0;
}
`;

/* ---------- Shared animation wrappers (safe) ---------- */
export const pulseAnim = css`
animation: ${pulse} 1.8s ease-out infinite;
`;

export const rippleAnim = css`
animation: ${ripple} 0.6s ease-out;
`;

/* ---------- Components ---------- */

export const HighlightRing = styled.div`
position: absolute;
inset: -6px;
border-radius: 50%;
pointer-events: none;

${pulseAnim}
`;

export const Ripple = styled.div`
position: absolute;
inset: 0;
border-radius: 50%;
pointer-events: none;

background: rgba(99, 102, 241, 0.28);

${rippleAnim}
`;

export const NewBadge = styled.span`
position: absolute;
top: -6px;
right: -6px;

background: linear-gradient(135deg, #6366f1, #4f46e5);
color: #fff;

font-size: 10px;
padding: 3px 6px;
border-radius: 6px;

font-weight: 600;

box-shadow: 0 4px 10px rgba(99,102,241,0.25);
`;

export const Hint = styled.p`
margin-top: 6px;
font-size: 12px;
color: #6366f1;

animation: fadeIn 0.3s ease;
`;

/* ---------- Optional global fallback ---------- */
export const GlobalStylesFix = css`
@keyframes fadeIn {
from {
opacity: 0;
transform: translateY(6px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
`;