import styled from 'styled-components';

export const OurStoryDescription = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: regular;
  width: 100%;
  gap: 30px;
  padding: 10px;
`;

export const Header = styled.h1`
  font-size: 50px;
`;

export const Paragraph = styled.p`
  padding: 20px;
  border-spacing: 80px;
  max-width: 80%;
`;
