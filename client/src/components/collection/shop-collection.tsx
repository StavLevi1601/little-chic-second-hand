import { DetailsCollection } from "./details-collection";
import { FilterCollection } from "./filter-collection";
import { collections } from "../../mock/collection-shop";
import {
  CollectionDetails,
  CollectionImage,
  CollectionSubContainer,
} from "./shop-collection.style";

export function ShopCollection() {
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
    </div>
  );
}
