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

export const CollectionImage = styled.img`
  object-fit: contain;
  width: 100%;
`;

export const CollectionDetails = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

// transform: hoveredId === collection.id ? 'scale(1.2)' : 'scale(1)',
// transition: 'transform 0.3s ease-in-out',
