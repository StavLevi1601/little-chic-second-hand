import styled from "styled-components";

export const CollectionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CollectionSubContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  width: 100%;
`;

type CollectionImageProps = {
  fontStyle: 'bold' | 'normal'
  border: '2px solid gray' | 'none'
}
export const CollectionImage = styled.img<CollectionImageProps>`
  object-fit: contain;
  width: 100%;
  font-weight: ${props => props.fontStyle};
  border: ${props => props.border};
`;

export const CollectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
