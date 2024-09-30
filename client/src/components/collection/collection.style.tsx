import styled from 'styled-components';

export const Button = styled.button`
  background-color: white;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  /* font-weight: 10; */
  max-width: 100%;
  padding: 10px 20px;
  border: 0.5px solid grey;
  border-radius: 5px;
  cursor: pointer;
  width: 230px;
  height: 53px;
`;
