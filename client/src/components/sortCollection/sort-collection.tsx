import React from "react";
import { Select } from "./sort.style";
import { SortKey } from "../../validations/itemSchema";
import { useSorting } from "../../hooks/useSorting";

const sortBy = ["Title", "Body", "Price", "Size"] as const;

type Props = {
  onSortChange: (newSort: SortKey) => void;
};

export function SortCollection({ onSortChange }: Props) {
  const { sortType, setSortType } = useSorting();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortKey;
    setSortType(newSort);
    onSortChange(newSort);
  };

  return (
    <div style={{ width: "200px" }}>
      <Select value={sortType} onChange={handleSortChange}>
        {sortBy.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
