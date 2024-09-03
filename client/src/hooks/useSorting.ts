import { useMemo, useState } from "react";
import { ItemSchema, SortKey } from "../validations/itemSchema";

export function useSorting() {
  const [sortType, setSortType] = useState<SortKey>("Title");

  const sortItems = useMemo(
    () =>
      (items: ItemSchema[]): ItemSchema[] => {
        return [...items].sort((a, b) => {
          switch (sortType) {
            case "Title":
              return a.title.localeCompare(b.title, undefined, {
                sensitivity: "base",
              });
            case "Body":
              return a.body.localeCompare(b.body, undefined, {
                sensitivity: "base",
              });
            case "Price":
              return a.price - b.price;
            case "Size":
              return a.size.localeCompare(b.size, undefined, {
                sensitivity: "base",
              });
            default:
              return 0;
          }
        });
      },
    [sortType]
  );

  return { sortType, setSortType, sortItems };
}
