import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 320px;
  margin: 250px auto;
`;

export const Header = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 20px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

export const SubHeader = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 20px;
  text-align: center;
  font-size: 15px;
  color: #616161;
`;

export const Line = styled.hr`
  border: 1px solid #b4b4b4;
  margin: 20px 0;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  outline: none;
  background: transparent;

  border-bottom: 1px solid #000000;
  &:hover {
    border-color: #7f54ff;
  }
`;

export const Error = styled.span`
  color: red;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 12px;
`;

export const SubmitContainer = styled.div`
  display: flex;
`;

export const Submit = styled.button`
  padding: 8px 20px;
  border: 1px solid #b4b4b4;
  text-align: center;
  cursor: pointer;
  background-color: #b4b4b4;
  color: #fff;
  max-width: 100%;
`;

export const SubmitWhite = styled(Submit)`
  background-color: #ffff;
  color: #000;
`;

export const ButtonAction = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 15px;
  color: #7f54ff;
`;

export const DividerWithText = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.secondary};
  width: 100%;
  margin: 20px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  &:not(:empty)::before {
    margin-right: 0.25em;
  }

  &:not(:empty)::after {
    margin-left: 0.25em;
  }
`;
