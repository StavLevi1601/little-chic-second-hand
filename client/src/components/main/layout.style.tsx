import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLink = styled(Link)`
  padding: 31px;
  width: 140px;
  height: 31px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 17px;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

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
  font-weight: 600;
`;

export const SearchingRow = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

export const Button = styled.button`
  padding: 31px;
  width: 140px;
  height: 31px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 17px;
  font-family: ${({ theme }) => theme.fonts.primary};
`;
