import { DetailsCollection } from "./details-collection";
import { FilterCollection } from "./filter-collection";
import { collections } from "../../mock/collection-shop";
import {
  CollectionDetails,
  CollectionImage,
  CollectionSubContainer,
} from "./shop-collection.style";
import { SortCollection } from "./sort-collection";
import { SortKey, itemsSchemaFilterKeys } from "../../validations/itemSchema";
import { useState } from "react";

export function ShopCollection() {
  const [sortType, setSortType] = useState<SortKey>(itemsSchemaFilterKeys[0]);

  const handleSortChange = (newSort: SortKey) => {
    setSortType(newSort);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FilterCollection />

      <CollectionSubContainer>
        {collections.map((collection, index) => (
          <CollectionDetails key={index}>
            <CollectionImage
              src={collection.image}
              alt={`Collection Image ${index + 1}`}
            />
            <DetailsCollection
              name={collection.name}
              price={collection.price}
            />
          </CollectionDetails>
        ))}
      </CollectionSubContainer>
      <SortCollection
        onSortChange={handleSortChange}
        selected={sortType}
        sortTypesOption={itemsSchemaFilterKeys}
      />
    </div>
  );
}
