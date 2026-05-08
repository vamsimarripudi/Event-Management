import styled from "styled-components";

export const SidebarContainer = styled.div`
    width: 220px;
    background: rgba(248, 250, 252, 0.85); /* slightly darker than navbar */
backdrop-filter: blur(14px);
-webkit-backdrop-filter: blur(14px);
border-right: 1px solid rgba(0, 0, 0, 0.06);
    padding: 32px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    box-shadow: 2px 0 10px rgba(0,0,0,0.08);
    z-index: 100;
    @media screen and (max-width: 768px) {
        position: fixed;
        width: 100%;
        height: 50px;
        flex-direction: row;
        justify-content: space-around;
        box-shadow: none;
        padding: 10px ;
        
        margin-bottom:10px;
        
        background:"#ffffff";
        
    }
`;

export const SidebarLink = styled.a`
    margin: 18px 0;
    text-decoration: none;
    color: #333;
    font-size: 1.15rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 24px;
    border-radius: 8px;
    transition: background 0.2s, color 0.2s;
    &:hover {
        background: #007bff;
        color: #fff;
    }
    @media (max-width: 768px) {
        margin: 0 10px;
        padding: 8px 12px;
        font-size: 1rem;
    }
`;


export const SidebarItem = styled.div`
display:flex;
align-items:center;
gap:12px;
padding:12px 14px;
border-radius:14px;

cusor:${({disabled}) => disabled ? "not-allowed":"pointer"};
opacity:${({disabled}) => disabled ? 0.55 : 1};
transition: all 0.2s ease;

&:hover {
background: ${({disabled}) => disabled ? "transparent" : "rgba(99,102,241,0.1)"};
transform: ${({disabled}) => disabled ? "none":"translateX(4px)"};
};

`

export const SidebarText = styled.p`
    margin:0;
    font-size:15px;
    font-weight:500;
`