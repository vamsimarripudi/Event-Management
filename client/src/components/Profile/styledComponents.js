import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: #1c283a;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width:768px){
      width:100%;
  }
`;


export const Header = styled.h2`
  margin-bottom: 20px;
`;

export const UserName = styled.span`
  font-weight: 700;
`;

export const Grid = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StatBox = styled.div`
  flex: 1;
  background: #fff;
  padding: 16px;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);

  h3 {
    margin: 0;
  }

  p {
    font-size: 12px;
    color: #777;
  }
`;

export const ProfileCard = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 18px;
  display: flex;
  gap: 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.07);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
`;

export const Section = styled.div`
  flex: 1;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 13px;
  margin-bottom: 5px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;

  &:disabled {
    background: #f3f4f6;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #111;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: 600;

  &:active {
    transform: scale(0.97);
  }
`;

export const CenterBox = styled.div`
  text-align: center;
  padding: 40px 0;
`;

export const Message = styled.p`
  color: #666;
`;