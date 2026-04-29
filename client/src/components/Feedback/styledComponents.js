import styled from "styled-components"
export const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #111;
  color: #fff;
  padding: 12px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  z-index: 9999;

  &:hover {
    background: #333;
  }
`;
export const ModalContainer = styled.div`
  width: 340px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
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
  background: #111;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background: #777;
    cursor: not-allowed;
  }
` ;

