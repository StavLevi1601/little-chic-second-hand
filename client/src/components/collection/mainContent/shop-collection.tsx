import { DetailsCollection } from "../mainContent/details-collection";
import { FilterCollection } from "../sidebar/filter-collection";
import { collections, mockImage } from "../../../mock/collection-shop";
import {
  CollectionDetails,
  CollectionImage,
  CollectionSubContainer,
} from "./shop-collection.style";
import { SortCollection } from "../topRightAction/sort-collection";
import {
  ItemSchema,
  SortKey,
  sortKeySchema,
} from "../../../validations/itemSchema";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGetItem } from "../../../utils/fetch";
import ModalAddItem from "../../items/modal-add-item";
import { AddCollection } from "../topRightAction/add-collection";
import useAuthStore from "../../../store/useAuthState";

export function ShopCollection() {
  const [sortType, setSortType] = useState<SortKey>(sortKeySchema[0]);
  const [collectionsFilter, setCollectionsFilter] =
    useState<ItemSchema[]>(collections);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { user } = useAuthStore();
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

      collectionsFilter.forEach((collection) => {
        if (collection.seller_id === user?.id) {
          console.log("collection", collection);
        }
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
            {/* {collection.seller_id === user?.id && (
              <div>
                <button>Edit</button>
                <button>Edit</button>
              </div>
            )} */}
            {/* <DeleteCollection
              onDelete={() => handleDeleteCollection(collection.id)}/>
              <EditCollection onEdit={() => handleEditCollection(collection.id)}/> */}
          </CollectionDetails>
        ))}
      </CollectionSubContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px",
          gap: "20px",
        }}
      >
        <AddCollection onAddItem={openModalAddItem} />
        <SortCollection
          onSortChange={handleSortChange}
          selected={sortType}
          sortTypesOption={sortKeySchema}
        />
      </div>
      <ModalAddItem
        isOpen={isOpenModal}
        onClose={closeModalAddItem}
        updaeAddingItem={handleUpdateAddingItem}
      />
    </div>
  );
}
