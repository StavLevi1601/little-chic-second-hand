import React from "react";
import { Select } from "./sort-collection.style";
import { SortKey } from "../../../validations/itemSchema";

// const sortBy = ["Title", "Body", "Price", "Size"] as const;

type Props = {
  onSortChange: (newSort: SortKey) => void;
  sortTypesOption: string[];
  selected: string;
};

export function SortCollection({
  onSortChange,
  sortTypesOption,
  selected,
}: Props) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortKey;
    onSortChange(newSort);
  };

  return (
    <div style={{ width: "200px" }}>
      <Select value={selected} onChange={handleSortChange}>
        {sortTypesOption.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
