// styledComponents.js

import styled from "styled-components";

export const Container = styled.div`
    position:relative;

    min-height:100vh;

    overflow:hidden;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:24px;

    background:
        radial-gradient(
            circle at top left,
            rgba(99,102,241,0.18),
            transparent 28%
        ),
        radial-gradient(
            circle at bottom right,
            rgba(6,182,212,0.14),
            transparent 28%
        ),
        #020617;
`;

export const Overlay = styled.div`
    position:absolute;
    inset:0;

    background-image:
        linear-gradient(
            rgba(255,255,255,0.03) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,0.03) 1px,
            transparent 1px
        );

    background-size:40px 40px;

    mask-image:
        radial-gradient(
            circle at center,
            black 35%,
            transparent 90%
        );
`;

export const GlowOne = styled.div`
    position:absolute;

    width:320px;
    height:320px;

    border-radius:999px;

    background:#6366f1;

    top:-100px;
    left:-80px;

    opacity:0.22;

    filter:blur(120px);
`;

export const GlowTwo = styled.div`
    position:absolute;

    width:320px;
    height:320px;

    border-radius:999px;

    background:#06b6d4;

    bottom:-120px;
    right:-100px;

    opacity:0.16;

    filter:blur(120px);
`;

export const Content = styled.div`
    position:relative;
    z-index:2;

    width:100%;
    max-width:920px;

    padding:70px 50px;

    border-radius:36px;

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.03)
        );

    border:
        1px solid rgba(255,255,255,0.08);

    backdrop-filter:blur(24px);

    text-align:center;

    animation:floatCard 6s ease-in-out infinite;

    @keyframes floatCard{

        0%{
            transform:translateY(0px);
        }

        50%{
            transform:translateY(-12px);
        }

        100%{
            transform:translateY(0px);
        }
    }

    @media screen and (max-width:768px){
        padding:50px 28px;
    }
`;

export const Badge = styled.div`
    width:fit-content;

    margin:auto auto 28px;

    padding:10px 18px;

    border-radius:999px;

    background:
        rgba(255,255,255,0.06);

    border:
        1px solid rgba(255,255,255,0.08);

    color:#cbd5e1;

    font-size:13px;
    font-weight:700;

    letter-spacing:0.5px;
`;

export const Title = styled.h1`
    display:flex;
    align-items:center;
    justify-content:center;

    gap:10px;

    font-family:'Poppins',sans-serif;

    font-size:82px;
    font-weight:900;

    letter-spacing:-4px;

    margin-bottom:30px;

    background:
        linear-gradient(
            90deg,
            #ffffff,
            #c4b5fd,
            #67e8f9
        );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    @media screen and (max-width:768px){
        font-size:58px;
    }

    @media screen and (max-width:480px){
        font-size:42px;
    }
`;

export const AnimatedDot = styled.div`
    width:16px;
    height:16px;

    border-radius:999px;

    background:
        linear-gradient(
            135deg,
            #8b5cf6,
            #06b6d4
        );

    box-shadow:
        0 0 18px rgba(99,102,241,0.8),
        0 0 30px rgba(6,182,212,0.5);

    animation:pulseDot 1.6s infinite ease-in-out;

    @keyframes pulseDot{

        0%{
            transform:scale(1);
            opacity:0.8;
        }

        50%{
            transform:scale(1.35);
            opacity:1;
        }

        100%{
            transform:scale(1);
            opacity:0.8;
        }
    }
`;

export const Description = styled.p`
    max-width:760px;

    margin:auto;

    color:#94a3b8;

    font-size:18px;

    line-height:2;

    @media screen and (max-width:768px){
        font-size:16px;
    }
`;

export const FeatureGrid = styled.div`
    margin-top:48px;

    display:grid;

    grid-template-columns:
        repeat(auto-fit,minmax(220px,1fr));

    gap:18px;
`;

export const FeatureCard = styled.div`
    padding:22px;

    border-radius:22px;

    background:
        rgba(255,255,255,0.05);

    border:
        1px solid rgba(255,255,255,0.08);

    color:#e2e8f0;

    font-size:15px;
    font-weight:600;

    transition:0.3s ease;

    &:hover{
        transform:translateY(-6px);

        border:
            1px solid rgba(99,102,241,0.28);

        background:
            rgba(99,102,241,0.08);
    }
`;

export const FooterText = styled.div`
    margin-top:42px;

    color:#64748b;

    font-size:14px;
    font-weight:500;

    letter-spacing:1px;

    text-transform:uppercase;
`;


// Add these in styledComponents.js

export const RecruiterNote = styled.div`
    margin-top:42px;

    padding:30px;

    border-radius:28px;

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,0.05),
            rgba(255,255,255,0.03)
        );

    border:
        1px solid rgba(255,255,255,0.08);

    backdrop-filter:blur(20px);

    text-align:left;

    transition:0.3s ease;

    &:hover{
        border:
            1px solid rgba(99,102,241,0.24);

        background:
            linear-gradient(
                180deg,
                rgba(99,102,241,0.08),
                rgba(255,255,255,0.03)
            );
    }

    ul{
        margin-top:18px;

        padding-left:20px;

        display:flex;
        flex-direction:column;

        gap:14px;
    }

    li{
        color:#cbd5e1;

        line-height:1.8;

        font-size:15px;
    }

    @media screen and (max-width:768px){
        padding:24px;
    }
`;

export const FocusTitle = styled.h2`
    font-size:24px;
    font-weight:800;

    letter-spacing:-0.5px;

    margin-bottom:10px;

    background:
        linear-gradient(
            90deg,
            #ffffff,
            #c4b5fd,
            #67e8f9
        );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    @media screen and (max-width:768px){
        font-size:20px;
    }
`;

export const RecruiterText = styled.p`
    margin-top:18px;

    color:#cbd5e1;

    font-size:15px;

    line-height:2;

    @media screen and (max-width:768px){
        font-size:14px;
        line-height:1.9;
    }
`;


// Add these in styledComponents.js

export const CountdownWrapper = styled.div`
    margin-top:42px;

    display:grid;

    grid-template-columns:
        repeat(auto-fit,minmax(140px,1fr));

    gap:18px;

    width:100%;

    @media screen and (max-width:768px){

        grid-template-columns:
            repeat(2,1fr);
    }
`;

export const CountdownCard = styled.div`
    position:relative;

    overflow:hidden;

    padding:28px 20px;

    border-radius:28px;

    background:
        linear-gradient(
            180deg,
            rgba(255,255,255,0.06),
            rgba(255,255,255,0.03)
        );

    border:
        1px solid rgba(255,255,255,0.08);

    backdrop-filter:blur(20px);

    text-align:center;

    transition:0.3s ease;

    &::before{
        content:"";

        position:absolute;

        inset:0;

        background:
            linear-gradient(
                135deg,
                rgba(255,255,255,0.06),
                transparent
            );

        pointer-events:none;
    }

    &:hover{
        transform:translateY(-6px);

        border:
            1px solid rgba(99,102,241,0.28);

        box-shadow:
            0 18px 40px rgba(0,0,0,0.35);
    }
`;

export const CountdownValue = styled.h2`
    font-size:52px;
    font-weight:900;

    line-height:1;

    margin-bottom:10px;

    background:
        linear-gradient(
            90deg,
            #ffffff,
            #c4b5fd,
            #67e8f9
        );

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    @media screen and (max-width:768px){
        font-size:42px;
    }

    @media screen and (max-width:480px){
        font-size:34px;
    }
`;

export const CountdownLabel = styled.p`
    color:#94a3b8;

    font-size:13px;
    font-weight:700;

    letter-spacing:1px;

    text-transform:uppercase;
`;

export const StatusRow = styled.div`
    display:flex;
    align-items:center;

    gap:12px;

    margin-top:18px;

    color:#e2e8f0;

    font-size:15px;
    font-weight:600;
`;

export const StatusDot = styled.div`
    width:12px;
    height:12px;

    border-radius:999px;

    background:#22c55e;

    box-shadow:
        0 0 12px rgba(34,197,94,0.8),
        0 0 24px rgba(34,197,94,0.45);

    animation:pulseStatus 1.5s infinite ease-in-out;

    @keyframes pulseStatus{

        0%{
            transform:scale(1);
            opacity:0.7;
        }

        50%{
            transform:scale(1.25);
            opacity:1;
        }

        100%{
            transform:scale(1);
            opacity:0.7;
        }
    }
`;