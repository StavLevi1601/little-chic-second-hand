import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #000;
  border-radius: 4px;
  outline: none;

  &:hover {
    border-color: #7f54ff;
  }
`;

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Submit = styled.button`
  padding: 8px 20px;
  border: 1px solid #000;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  background-color: #7f54ff;
  color: #fff;
`;

export const SubmitWhite = styled(Submit)`
  background-color: #ffff;
  color: #000;
`;
