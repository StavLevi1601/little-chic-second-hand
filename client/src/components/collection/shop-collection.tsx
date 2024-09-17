import { DetailsCollection } from "./details-collection";
import { FilterCollection } from "./filter-collection";
import { collections, mockImage } from "../../mock/collection-shop";
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
import { fetchGetItem } from "../../utils/fetch";
import ModalAddItem from "../items/modal-add-item";
import { Button } from "../welcome/welcome.style";

export function ShopCollection() {
  const [sortType, setSortType] = useState<SortKey>(itemsSchemaFilterKeys[0]);
  const [collectionsFilter, setCollectionsFilter] =
    useState<ItemSchema[]>(collections);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // const filteredItems = useMemo(
  //   () =>
  //     [...collectionsFilter].sort((item1, item2) => {
  //       if (item1[sortType]! < item2[sortType]!) {
  //         return -1;
  //       }
  //       if (item1[sortType]! > item2[sortType]!) {
  //         return 1;
  //       }
  //       return 0;
  //     }),

  //   [collectionsFilter, sortType]
  // );

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await fetchGetItem();
      console.log("data.data", data.data);

      setCollectionsFilter((prevCollections) => {
        const newItems = data.data
          .filter(
            (newItem: ItemSchema) =>
              !prevCollections.some(
                (prevCollection) => prevCollection.id === newItem.id
              )
          )
          .map((newItem: ItemSchema) => {
            return {
              ...newItem,
              image: mockImage,
            };
          });

        return [...prevCollections, ...newItems];
      });
    };

    fetchItems();
  }, []);

  const navigate = useNavigate();

  const handleSortChange = (newSort: SortKey) => {
    setSortType(newSort);
  };

  const handleCollectionAccordingFilter = (
    filters: Record<string, string[]>
  ) => {
    const newCollections = collections.filter((collection) => {
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

  const openModalAddItem = () => {
    setIsOpenModal(true);
  };

  const closeModalAddItem = () => {
    console.log("ffff");

    setIsOpenModal(false);
  };

  const handleUpdateAddingItem = (item: ItemSchema) => {
    console.log("update", item);
    setCollectionsFilter((prevCollections) => {
      return [...prevCollections, item];
    });
    console.log("collectionsShop", collectionsFilter);
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
      <Button onClick={openModalAddItem}>Add item</Button>
      <SortCollection
        onSortChange={handleSortChange}
        selected={sortType}
        sortTypesOption={itemsSchemaFilterKeys}
      />
      <ModalAddItem
        isOpen={isOpenModal}
        onClose={closeModalAddItem}
        updaeAddingItem={handleUpdateAddingItem}
      />
    </div>
  );
}
