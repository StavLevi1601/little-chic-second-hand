import styled from 'styled-components';
import { Icon } from '@iconify/react';

export const IconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

export const StyledIcon = styled(Icon)`
  font-size: 24px;
  color: #333;
`;

export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  margin-bottom: 5px; // Add some space between icons
`;
