import styled from "styled-components";

/* ---------- Sidebar Container ---------- */

export const SidebarContainer = styled.div`
  position: fixed;

  top: 64px;
  left: 0;

  z-index: 100;

  width: 220px;
  height: calc(100vh - 64px);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px 12px;

  background: ${({ theme }) => theme.bg};

  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-right: 1px solid ${({ theme }) => theme.border};

  box-shadow: 2px 0 10px rgba(0,0,0,0.06);

  transition: 0.2s ease;

  @media screen and (max-width: 768px) {
    top: auto;
    bottom: 0;

    width: 100%;
    height: 70px;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    padding: 8px 10px;

    border-right: none;
    border-top: 1px solid ${({ theme }) => theme.border};

    box-shadow: 0 -2px 10px rgba(0,0,0,0.06);
  }
`;

/* ---------- Sidebar Link ---------- */

export const SidebarLink = styled.a`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 12px;

  margin-bottom: 10px;

  padding: 12px 16px;

  border-radius: 14px;

  text-decoration: none;

  color: ${({ theme }) => theme.text};

  font-size: 15px;
  font-weight: 500;

  transition: 0.2s ease;

  &:hover {
    background: rgba(99,102,241,0.1);

    color: #6366f1;
  }

  @media screen and (max-width: 768px) {
    width: auto;

    flex-direction: column;

    justify-content: center;

    gap: 4px;

    margin-bottom: 0;

    padding: 6px 10px;

    font-size: 12px;
  }
`;

/* ---------- Sidebar Item ---------- */

export const SidebarItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 12px;

  border-radius: 14px;

  cursor: ${({ disabled }) =>
    disabled ? "not-allowed" : "pointer"};

  opacity: ${({ disabled }) =>
    disabled ? 0.55 : 1};

  transition: 0.2s ease;

  &:hover {
    background: ${({ disabled }) =>
      disabled
        ? "transparent"
        : "rgba(99,102,241,0.1)"};

    transform: ${({ disabled }) =>
      disabled
        ? "none"
        : "translateX(3px)"};
  }

  @media screen and (max-width: 768px) {
    width: auto;

    flex-direction: column;

    gap: 4px;

    justify-content: center;
  }
`;

/* ---------- Sidebar Text ---------- */

export const SidebarText = styled.p`
  margin: 0;

  font-size: 15px;
  font-weight: 500;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

/* ---------- Sidebar Bottom ---------- */

export const SidebarBottom = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 10px;

  margin-top: auto;

  padding-top: 16px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

/* ---------- Divider ---------- */

export const Divider = styled.div`
  width: 100%;
  height: 1px;

  margin: 8px 0;

  background: ${({ theme }) => theme.border};

  opacity: 0.7;

  transition: 0.2s ease;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;