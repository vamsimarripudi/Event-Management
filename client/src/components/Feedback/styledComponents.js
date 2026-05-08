import styled from "styled-components"
export const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${({theme}) => theme.card}
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  z-index: 999


  &:hover {
    background: #333;
  }
`;

export const RatingText = styled.div`
  font-size: 12px;
  color: ${({theme}) => theme.text}
  margin-bottom: 10px;
`;

export const ErrorText = styled.div`
  color: #ef4444;
  font-size: 12px;
  margin-top: 6px;
`;
export const ModalContainer = styled.div`
  width: 100%;
  padding: 24px;
  background: ${({theme}) => theme.card};
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width:768px){
        position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 400px;
      background: ${({theme}) => theme.card}
      border-radius: 10px;
      padding: 20px;
      z-index: 1000;
      
  }
`;
export const Title = styled.h3`
  margin-bottom: 15px;
`;
export const Label = styled.label`
  font-size: 14px;
  margin-top: 10px;
`;
export const Select = styled.select`
  margin-top: 5px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const Textarea = styled.textarea`
  margin-top: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export const CancelBtn = styled.button`
  background: #ccc;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
`;

export const SubmitBtn = styled.button`
  background:${({theme}) => theme.bg}
  color: ${({theme}) => theme.text}
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background: #777;
    cursor: not-allowed;
  }
` ;

