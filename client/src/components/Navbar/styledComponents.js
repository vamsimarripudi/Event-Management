import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background: #232526;
  color: #fff;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  @media screen and (max-width:768px){
  padding:10px;
  }
`;

export const Header = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const LogoutButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 8px 22px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: #0056b3;
  }
`;

