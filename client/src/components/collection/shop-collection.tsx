import { DetailsCollection } from "./details-collection";
import { FilterCollection } from "./filter-collection";
import { mockImage } from "../../mock/collection-shop";
import {
  CollectionDetails,
  CollectionImage,
  CollectionSubContainer,
} from "./shop-collection.style";
import { SortCollection } from "./sort-collection";
import {
  ItemSchema,
  SortKey,
  itemsSchemaFilterKeys,
} from "../../validations/itemSchema";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  collectionsShop: ItemSchema[];
};

export function ShopCollection({ collectionsShop }: Props) {
  const [sortType, setSortType] = useState<SortKey>(itemsSchemaFilterKeys[0]);
  const [collectionsFilter, setCollectionsFilter] =
    useState<ItemSchema[]>(collectionsShop);

  useEffect(() => {
    setCollectionsFilter(collectionsShop);
  }, [collectionsShop]);

  const navigate = useNavigate();

  const handleSortChange = (newSort: SortKey) => {
    setSortType(newSort);
  };

  const handleCollectionAccordingFilter = (
    filters: Record<string, string[]>
  ) => {
    const newCollections = collectionsShop.filter((collection) => {
      return Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) {
          return true;
        }
        return values.includes(String(collection[key as keyof ItemSchema]));
      });
    });

    setCollectionsFilter(newCollections);
  };

  const handleProductPage = (collection: ItemSchema) => {
    navigate(`/items/${collection.id}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FilterCollection onFilter={handleCollectionAccordingFilter} />
      <CollectionSubContainer>
        {collectionsFilter.map((collection, index) => (
          <CollectionDetails key={index}>
            <CollectionImage
              src={collection.image ? collection.image : mockImage}
              alt={`Collection Image ${index + 1}`}
              onClick={() => handleProductPage(collection)}
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
