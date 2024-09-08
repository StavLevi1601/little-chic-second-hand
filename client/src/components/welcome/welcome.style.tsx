import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  padding-top: 60px;
  flex-direction: "column";
`;

export const Header = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  margin-bottom: 5px;
  text-align: center;
  font-size: 60px;
`;

export const SearchingRow = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

export const Button = styled.div`
  padding: 31px;
  width: 140px;
  height: 31px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 15px;
`;
