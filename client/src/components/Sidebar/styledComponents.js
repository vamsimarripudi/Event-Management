import styled from "styled-components"


export const SidebarContainer = styled.div`
  width: 250px; 
    background-color: #f0f0f0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    height: 100vh;
    top: 0;
    left: 0;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
`

export const DashboardLink = styled.a`
    margin: 10px 0;
    text-decoration: none;
    color: #333;
    font-size: 18px;
    &:hover {
        color: #007BFF;
    }
`

export const EventsLink = styled.a`
    margin: 10px 0;
    text-decoration: none;
    color: #333;
    font-size: 18px;
    &:hover {
        color: #007BFF;
    }
`

