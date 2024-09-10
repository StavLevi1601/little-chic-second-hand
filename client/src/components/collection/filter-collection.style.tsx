import styled from "styled-components";

export const FilterText = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 10;
  font-size: 40px;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 50px 40px;
  flex-direction: column;
  white-space: nowrap;
`;

export const FilterItem = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  gap: 30px;
  padding: 5px;
`;

export const FilterButton = styled.button`
  background-color: white;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  /* font-weight: 10; */
  max-width: 100%;
  padding: 10px 20px;
  border: 0.5px solid grey;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;
