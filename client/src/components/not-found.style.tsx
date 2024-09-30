import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  width: 100%;
  background-color: #fbf4eb;
  margin: 0 auto;
  height: 651px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const PElement = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 50px;
`;

export const HElement = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 20px;
  font-size: 50px;
`;

export const Button = styled.button`
  background-color: black;
  color: white;
  border: 1px solid black;
  border-radius: 8px;
  padding: 10px;
  width: 186px;
  height: 45px;
`;
