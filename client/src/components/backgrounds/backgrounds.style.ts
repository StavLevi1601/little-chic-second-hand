import styled from 'styled-components';

type BackgroundAnimationProps = {
  backgroundImage: string;
};

export const BackgroundAnimation = styled.div<BackgroundAnimationProps>`
  margin-top: 20px;
  height: 651px;
  background-image: ${(props) => props.backgroundImage};
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.5s ease-in-out;
`;
