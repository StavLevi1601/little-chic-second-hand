import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 940px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 200;
  color: #333;
  margin-bottom: "20px";
  font-size: "24px";
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  margin-bottom: 10px;

  font-size: 16px;
  color: #333;
  margin-bottom: "10px";
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  margin-bottom: "20px";
  font-size: "16px";
`;

export const ImageInput = styled.input`
  margin-bottom: 20px;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  margin-bottom: "20px";
  height: "80px";
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  color: grey;
  background-color: white;
  cursor: pointer;
  margin-top: auto;
  border: 1px solid black;
  width: 100%;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const Image = styled.image`
  width: 100px;
  height: 100px;
  background-color: lightgrey;
`;
