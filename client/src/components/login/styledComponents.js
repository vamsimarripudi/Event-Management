import styled from "styled-components";

/* ---------- Main Container ---------- */

export const LoginContainer = styled.div`
  position: relative;

  width: 100%;
  min-height: 100vh;

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  background: ${({ theme }) => theme.bg};
`;

/* ---------- Background Decorations ---------- */

export const BackgroundDecorationTop = styled.div`
  position: absolute;

  top: -120px;
  right: -120px;

  width: 320px;
  height: 320px;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.25),
    rgba(168, 85, 247, 0.2)
  );

  filter: blur(80px);

  @media screen and (min-width: 768px) {
    width: 500px;
    height: 500px;
  }
`;

export const BackgroundDecorationBottom = styled.div`
  position: absolute;

  bottom: -100px;
  left: -100px;

  width: 280px;
  height: 280px;

  border-radius: 50%;

  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2),
    rgba(236, 72, 153, 0.18)
  );

  filter: blur(80px);

  @media screen and (min-width: 768px) {
    width: 420px;
    height: 420px;
  }
`;

/* ---------- Wrapper ---------- */

export const LoginWrapper = styled.div`
  position: relative;

  width: 100%;
  max-width: 420px;

  z-index: 2;
`;

/* ---------- Login Card ---------- */

export const LoginCard = styled.div`
  padding: 24px;

  border-radius: 24px;

  background: ${({ theme }) => theme.card};

  border: 1px solid ${({ theme }) => theme.border};

  box-shadow: ${({ theme }) => theme.shadow};

  backdrop-filter: blur(18px);

  @media screen and (min-width: 768px) {
    padding: 32px;
  }
`;

/* ---------- Header ---------- */

export const LoginHeader = styled.div`
  text-align: center;

  margin-bottom: 28px;
`;

export const LoginTitle = styled.h1`
  margin-bottom: 8px;

  font-size: 32px;
  font-weight: 700;

  color: ${({ theme }) => theme.text};

  @media screen and (max-width: 480px) {
    font-size: 28px;
  }
`;

export const LoginSubtitle = styled.p`
  font-size: 14px;
  line-height: 1.6;

  color: ${({ theme }) => theme.mutedText};
`;

/* ---------- Form ---------- */

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 18px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.text};
`;

/* ---------- Inputs ---------- */

export const FormInput = styled.input`
  width: 100%;

  padding: 12px 14px;

  border-radius: 12px;

  border: 1px solid ${({ theme }) => theme.border};

  background: ${({ theme }) => theme.bg};

  color: ${({ theme }) => theme.text};

  font-size: 14px;

  transition: 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.mutedText};
  }

  &:focus {
    outline: none;

    border-color: #6366f1;

    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const PasswordToggle = styled.button`
  position: absolute;

  top: 50%;
  right: 14px;

  transform: translateY(-50%);

  border: none;
  outline: none;

  background: transparent;

  cursor: pointer;

  color: ${({ theme }) => theme.mutedText};

  transition: 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.text};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

/* ---------- Forgot Password ---------- */

export const ForgotPassword = styled.div`
  display: flex;
  justify-content: flex-end;

  a {
    font-size: 13px;

    color: #6366f1;

    text-decoration: none;

    transition: 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;

/* ---------- Login Button ---------- */

export const LoginButton = styled.button`
  width: 100%;

  border: none;
  outline: none;

  cursor: pointer;

  padding: 12px 16px;

  border-radius: 12px;

  background: #6366f1;

  color: #ffffff;

  font-size: 15px;
  font-weight: 600;

  transition: 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* ---------- Footer ---------- */

export const LoginFooter = styled.div`
  margin-top: 22px;

  text-align: center;

  p {
    font-size: 14px;

    color: ${({ theme }) => theme.mutedText};
  }

  a {
    color: #6366f1;

    text-decoration: none;

    transition: 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;