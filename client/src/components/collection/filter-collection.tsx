import { itemSchemaFilter } from "../../validations/itemSchema";
import {
  FilterContainer,
  FilterItem,
  FilterText,
} from "./filter-collection.style";
import { Accordion } from "../accordion/accordion";
import { DividerWithText } from "../login/login.style";

const itemsSchemaFilter = Object.keys(itemSchemaFilter.shape) as Array<
  keyof typeof itemSchemaFilter.shape
>;

export function FilterCollection() {
  return (
    <FilterContainer>
      <FilterText>Filter by</FilterText>
      <DividerWithText />

      {itemsSchemaFilter.map((title, index) => (
        <FilterItem key={index}>
          <Accordion title={title} />
        </FilterItem>
      ))}
      <button>Filter</button>
    </FilterContainer>
  );
}
