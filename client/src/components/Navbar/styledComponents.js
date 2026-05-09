import styled from "styled-components";

/* ---------- Navbar ---------- */

export const NavbarContainer = styled.nav`
  position: fixed;

  top: 0;
  left: 0;

  z-index: 200;

  width: 100%;
  height: 64px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 14px;

  background: ${({ theme }) => theme.navbar};

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-bottom: 1px solid ${({ theme }) => theme.border};

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media screen and (min-width: 768px) {
    padding: 0 28px;
  }
`;

/* ---------- Logo / Header ---------- */

export const Header = styled.h1`
  margin: 0;

  font-size: 20px;
  font-weight: 700;

  letter-spacing: 0.5px;

  color: ${({ theme }) => theme.text};

  @media screen and (min-width: 768px) {
    font-size: 28px;
  }
`;

/* ---------- Desktop Logout ---------- */

export const LogoutButton = styled.button`
  border: none;
  outline: none;

  cursor: pointer;

  margin-left: auto;

  padding: 10px 18px;

  border-radius: 10px;

  background: #6366f1;

  color: #ffffff;

  font-size: 14px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.97);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

/* ---------- Mobile Logout ---------- */

export const MobileLogout = styled.button`
  display: none;

  border: none;
  outline: none;

  background: transparent;

  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 44px;
    height: 44px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;

    color: #ef4444;

    font-size: 22px;
    font-weight: 600;

    transition: 0.2s ease;

    &:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    &:active {
      transform: scale(0.96);
    }
  }
`;

/* ---------- Theme Toggle ---------- */

export const Theme = styled.div`
  margin-right: 10px;

  display: flex;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

/* ---------- Mobile Actions ---------- */

export const MobileContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;
`;