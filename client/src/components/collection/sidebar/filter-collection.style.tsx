import styled from 'styled-components';

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
