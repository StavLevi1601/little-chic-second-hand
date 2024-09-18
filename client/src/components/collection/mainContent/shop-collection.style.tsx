import styled from "styled-components";

export const CollectionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CollectionSubContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0 auto;
`;

export const CollectionImage = styled.img`
  object-fit: contain;
  width: 100%;
`;

export const CollectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
