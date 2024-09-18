import styled from "styled-components";

// export const Select = styled.select`
//   width: "100%";
//   padding: "20px";
//   font-size: "10px";
//   border: "1px solid red";
//   border-radius: "4px";
//   padding: "20px";
// `;

export const Select = styled.select`
  background-color: white;
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  /* font-weight: 10; */
  padding: 10px 10px;
  border: 0.5px solid grey;
  border-radius: 5px;
  cursor: pointer;
  width: 230px;
  height: 53px;
`;
