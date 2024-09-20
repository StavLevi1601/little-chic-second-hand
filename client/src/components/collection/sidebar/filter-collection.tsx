import { itemsSchemaFilterKeys } from "../../../validations/itemSchema";
import {
  FilterContainer,
  FilterItem,
  FilterText,
} from "./filter-collection.style";
import { Accordion } from "../../accordion/accordion";
import { DividerWithText } from "../../login/login.style";
import { useState } from "react";
import { Button } from "../collection.style";

type Props = {
  onFilter: (filters: Record<string, string[]>) => void;
};
export function FilterCollection({ onFilter }: Props) {
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (title: string, values: string[]) => {
    setFilters((prev) => ({ ...prev, [title]: values }));
  };

  const handleFilterClick = () => {
    onFilter(filters);
  };

  return (
    <FilterContainer>
      <FilterText>Filter by</FilterText>
      {/* <DividerWithText /> */}
      {itemsSchemaFilterKeys.map((title, index) => (
        <FilterItem key={index}>
          <Accordion title={title} onFilterChange={handleFilterChange} />
        </FilterItem>
      ))}
      <Button onClick={handleFilterClick}>Filter</Button>
    </FilterContainer>
  );
}
