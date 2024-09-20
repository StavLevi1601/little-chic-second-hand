import { FilterCollection } from "../sidebar/filter-collection";

const handleCollectionAccordingFilter = (
  filters: Record<string, string[]>
) => {};

export function MyCollection() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FilterCollection onFilter={handleCollectionAccordingFilter} />
    </div>
  );
}
