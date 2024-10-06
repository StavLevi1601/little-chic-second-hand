import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding-top: 60px;
`;

export const Header = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 5px;
  text-align: center;
  font-size: 60px;
  font-weight: 600;
`;

export const SearchingRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin: 20px 0;
`;

export const Button = styled.div`
  padding: 31px;
  width: 140px;
  height: 31px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 15px;
`;
