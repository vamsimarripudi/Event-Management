import styled from "styled-components";

export const SidebarContainer = styled.div`
    width: 220px;
    background: ${({theme}) => theme.bg}
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
        
        background:${({theme}) => theme.bg}
        
    }
`;

export const SidebarLink = styled.a`
    margin: 10px 0;
    text-decoration: none;
    color: ${({theme}) => theme.text};
    font-size: 1.15rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
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
    
    font-size:1.15rem;
    font-weight:500;
     @media (max-width: 768px) {
        margin: 0 10px;
        
        font-size: 1rem;
    }
`

export const SidebarBottom = styled.div`
    display:flex;
    flex-direction:column;
    gap:10px;
    margin-top:auto;
    padding-top:16px;
    @media screen and (max-width:768px){
    display:none
    }
    
`

export const Divider = styled.div`
width:100%;
height:1px;
background:${({theme}) => theme.border};
opacity:0.7;
margin-bottom:6px;
transition: background 0.25s ease, opacity 0.25s ease;
@media screen and (max-width:768px){
display:none
}
`