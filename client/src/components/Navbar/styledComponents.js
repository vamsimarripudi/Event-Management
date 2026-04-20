import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: #333;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Header = styled.h1`
  color: #fff;
    margin: 0;
`;

export const LogoutButton = styled.button`
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background-color: #0056b3;
    }
`;

