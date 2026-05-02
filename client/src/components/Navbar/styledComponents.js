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
  @media screen and (max-width:768px){
     font-size:20px;
  }
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

  @media screen and (max-width:768px){
      font-size:12px;
      font-weight:bold;
      display:none
  }
`;



export const MobileLogout = styled.button`
  display: none;
  padding: 0;
  background: transparent;
  border: none;
  width: 100%;
  text-align: left;

  @media screen and (max-width: 768px) {
    display: block;
    color: #ef4444;
    font-size: 24px;
    font-weight: 600;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    width:50px;

    &:hover {
      background: #fee2e2;
    }

    &:active {
      transform: scale(0.97);
    }
  }
`;