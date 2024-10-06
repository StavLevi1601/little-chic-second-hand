import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: hidden;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  gap: 30px;
`;

export const LeftColumn = styled.div`
  flex: 1;
`;

export const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 100px;
`;

export const ImageInput = styled.input`
  margin-bottom: 15px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: auto;

  &:hover {
    background-color: #0056b3;
  }
`;
