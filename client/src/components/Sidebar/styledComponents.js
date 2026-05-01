import styled from "styled-components";

export const SidebarContainer = styled.div`
    width: 220px;
    background: linear-gradient(135deg, #232526 0%, #414345 100%);
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
        position: static;
        width: 100%;
        height: 50px;
        flex-direction: row;
        justify-content: space-around;
        box-shadow: none;
        padding: 10px ;
        top:0;
        margin-right:10px;
        margin-left:10px;
        margin-top:0px;
        border-radius:10px;
    }
`;

export const SidebarLink = styled.a`
    margin: 18px 0;
    text-decoration: none;
    color: #fff;
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

