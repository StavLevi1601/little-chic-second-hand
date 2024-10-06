import styled from 'styled-components';

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
  fontStyle: 'bold' | 'normal';
  border: '2px solid gray' | 'none';
};
export const CollectionImage = styled.img<CollectionImageProps>`
  object-fit: contain;
  width: 100%;
  font-weight: ${(props) => props.fontStyle};
  border: ${(props) => props.border};
`;

type CollectionDetailsProps = {
  transform: 'scale(1.2)' | 'scale(1)';
  transition: 'transform 0.3s ease-in-out';
};

export const CollectionDetails = styled.div<CollectionDetailsProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: ${(props) => props.transform}
  transition: ${(props) => props.transition}
`;

// transform: hoveredId === collection.id ? 'scale(1.2)' : 'scale(1)',
// transition: 'transform 0.3s ease-in-out',
