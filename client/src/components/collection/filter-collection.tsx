import { itemsSchemaFilterKeys } from "../../validations/itemSchema";
import {
  FilterButton,
  FilterContainer,
  FilterItem,
  FilterText,
} from "./filter-collection.style";
import { Accordion } from "../accordion/accordion";
import { DividerWithText } from "../login/login.style";

export function FilterCollection() {
  return (
    <FilterContainer>
      <FilterText>Filter by</FilterText>
      <DividerWithText />

      {itemsSchemaFilterKeys.map((title, index) => (
        <FilterItem key={index}>
          <Accordion title={title} />
        </FilterItem>
      ))}
      <FilterButton>Filter</FilterButton>
    </FilterContainer>
  );
}
