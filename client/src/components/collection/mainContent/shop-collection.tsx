import React, { useEffect, useState } from "react";
import { FilterCollection } from "../sidebar/filter-collection";
import { collections, mockImage } from "../../../mock/collection-shop";
import { CollectionContainer } from "./shop-collection.style";
import { SortCollection } from "../topRightAction/sort-collection";
import {
  ItemSchema,
  SortKey,
  sortKeySchema,
} from "../../../validations/itemSchema";
import { fetchGetItem } from "../../../utils/fetch";
import ModalAddItem from "../../items/modal-add-item";
import { AddCollection } from "../topRightAction/add-collection";
import { Collections } from "./collections";

export function ShopCollection() {
  const [sortType, setSortType] = useState<SortKey>(sortKeySchema[0]);
  const [collectionsFilter, setCollectionsFilter] =
    useState<ItemSchema[]>(collections);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await fetchGetItem();
      setCollectionsFilter((prevCollections) => {
        const newItems = data.data
          .filter(
            (newItem: ItemSchema) =>
              !prevCollections.some(
                (prevCollection) => prevCollection.id === newItem.id
              )
          )
          .map((newItem: ItemSchema) => ({ ...newItem, image: mockImage }));
        return [...prevCollections, ...newItems];
      });
    };
    fetchItems();
  }, []);

  const handleSortChange = (newSort: SortKey) => {
    setSortType(newSort);
  };

  const handleCollectionAccordingFilter = (
    filters: Record<string, string[]>
  ) => {
    const newCollections = collections.filter((collection) => {
      return Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        return values.includes(String(collection[key as keyof ItemSchema]));
      });
    });
    setCollectionsFilter(newCollections);
  };

  const openModalAddItem = () => setIsOpenModal(true);
  const closeModalAddItem = () => setIsOpenModal(false);

  const handleUpdateAddingItem = (item: ItemSchema) => {
    setCollectionsFilter((prevCollections) => [...prevCollections, item]);
  };

  const handleClickItems = () => {
    
  }

  return (
    <CollectionContainer>
      <FilterCollection onFilter={handleCollectionAccordingFilter} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
          <Collections collections={collectionsFilter!} onClickHandle={handleClickItems} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
            }}
          >
            <AddCollection onAddItem={openModalAddItem} />
            <SortCollection
              onSortChange={handleSortChange}
              selected={sortType}
              sortTypesOption={sortKeySchema}
            />
          </div>
        </div>
      </div>
      <ModalAddItem
        isOpen={isOpenModal}
        onClose={closeModalAddItem}
        updaeAddingItem={handleUpdateAddingItem}
      />
    </CollectionContainer>
  );
}
