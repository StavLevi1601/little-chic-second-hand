import styled from "styled-components";

export const DataCollection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  color: gray;
`;

export const CollectionText = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 15px;
`;
