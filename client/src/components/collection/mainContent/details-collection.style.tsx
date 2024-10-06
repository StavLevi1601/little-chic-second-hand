import styled from 'styled-components';

export const DataCollection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  color: gray;
  gap: 5px;
`;

export const CollectionText = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 15px;
`;

export const ButtonAddToCart = styled.div`
  border: 1px solid black;
  width: 179px;
  padding: 3px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }
`;
