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

export const LogoContainer = styled.div`
    display:flex;
    align-items:center;
    gap:12px;
`;

export const LogoImage = styled.img`
    width:52px;
    height:52px;
    object-fit:contain;

    @media screen and (max-width:768px){
        width:42px;
        height:42px;
    }

    @media screen and (max-width:480px){
        width:34px;
        height:34px;
    }
`;

export const LogoText = styled.h1`
    margin:0;
    display:flex;
    align-items:center;

    font-family:'Poppins',sans-serif;
    font-size:40px;
    font-weight:800;
    letter-spacing:1.5px;

    background:${({theme}) =>
        theme.logoText};

    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;

    text-shadow:${({theme}) =>
        theme.logoShadow};

    transition:all 0.3s ease;

    span{
        position:relative;

        font-size:55px;
        font-weight:900;

        margin-right:3px;

        background:${({theme}) =>
            theme.logoAccent};

        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;

        filter:
            drop-shadow(
                0 0 14px rgba(99,102,241,0.45)
            )
            drop-shadow(
                0 0 30px rgba(6,182,212,0.25)
            );

        transform:translateY(-2px);

        &::after{
            content:"";

            position:absolute;

            left:8%;
            bottom:6px;

            width:84%;
            height:8px;

            background:linear-gradient(
                90deg,
                rgba(99,102,241,0.75),
                rgba(6,182,212,0.75)
            );

            filter:blur(10px);

            border-radius:999px;

            z-index:-1;
        }
    }

    @media screen and (max-width:768px){

        font-size:28px;

        span{
            font-size:42px;
        }
    }

    @media screen and (max-width:480px){

        font-size:24px;
        letter-spacing:0.5px;

        span{
            font-size:30px;
        }
    }
`;