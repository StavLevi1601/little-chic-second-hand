import styled from "styled-components";

export const AccordionItem = styled.div``;

export const AccordionHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  width: 200px;
`;

export const AccordionTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 10;
  font-size: 18px;
`;

export const AccordionIcon = styled.div`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: 10;
  font-size: 18px;
`;

export const AccordionContent = styled.div`
  margin-top: 20px;
`;

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const AccordionLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 16px;
`;

export const AccordionInput = styled.input`
  margin-right: 10px;
`;

export const AccordionLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
