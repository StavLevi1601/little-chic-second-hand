import { useEffect, useMemo, useState } from "react";
import { Button, Container, Header, SearchingRow } from "./welcome.style";
import ModalAddItem from "../items/modal-add-item";
import { AnimationBackgrounds } from "../backgrounds/backgrounds";
import { ShopCollection } from "../collection/shop-collection";
import { DividerWithText } from "../login/login.style";
import { ItemSchema, SortKey, itemSchema } from "../../validations/itemSchema";
import { fetchGetItem } from "../../utils/fetch";
import { collections } from "../../mock/collection-shop";

const sortKeys = Object.keys(itemSchema.shape) as unknown as Array<
  keyof ItemSchema
>;

function Welcome() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [sortType, setSortType] = useState<SortKey>(sortKeys[0]);
  const [isShowItems, setIsShowItems] = useState<boolean>(false);
  const [collectionsShop, setCollectionsShop] =
    useState<ItemSchema[]>(collections);

  const filteredItems = useMemo(
    () =>
      [...collectionsShop].sort((item1, item2) => {
        if (item1[sortType]! < item2[sortType]!) {
          return -1;
        }
        if (item1[sortType]! > item2[sortType]!) {
          return 1;
        }
        return 0;
      }),

    [collectionsShop, sortType]
  );

  console.log("filteredItems", filteredItems);

  useEffect(() => {
    const fetchITems = async () => {
      const { data } = await fetchGetItem();

      setCollectionsShop((prevCollections) => {
        const newItems = data.data.filter((newItem: ItemSchema) => {
          if ("id" in newItem) {
            return !prevCollections.some(
              (existingItem) =>
                "id" in existingItem && existingItem.id === newItem.id
            );
          }
        });
        return [...prevCollections, ...newItems];
      });
    };

    fetchITems();
  }, []);

  const showItems = async () => {
    setIsShowItems(true);
    addItemsToCollections();
  };

  const openModalAddItem = () => {
    setIsOpenModal(true);
  };

  const closeModalAddItem = () => {
    setIsOpenModal(false);
  };

  const handleUpdateAddingItem = (item: ItemSchema) => {
    console.log("update", item);
    setCollectionsShop((prevCollections) => {
      return [...prevCollections, item];
    });
    console.log("collectionsShop", collectionsShop);
  };

  const addItemsToCollections = () => {
    setCollectionsShop((prevCollections) => {
      const newItems = filteredItems.filter((newItem) => {
        if ("id" in newItem) {
          return !prevCollections.some(
            (existingItem) =>
              "id" in existingItem && existingItem.id === newItem.id
          );
        }
      });
      return [...prevCollections, ...newItems];
    });
  };

  return (
    <Container style={{ flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header>Little Chic</Header>
        <SearchingRow style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={showItems}>Shop Collection</Button>
          <Button onClick={() => setIsShowItems(false)}>Our Story</Button>
          <Button>Gift Card</Button>
          <Button onClick={openModalAddItem}>Add item</Button>
          <Button onClick={() => console.log("gdf")}>My items</Button>
        </SearchingRow>
        {isShowItems && <DividerWithText />}
      </div>
      {!isShowItems ? (
        <AnimationBackgrounds isShowItems={isShowItems} />
      ) : (
        <ShopCollection collectionsShop={filteredItems} />
      )}
      {/* {isShowItems ? (
        <div>
          <SortCollection
            onSortChange={handleSortChange}
            selected={sortType}
            sortTypesOption={sortKeys}
          />
          <GetCollection items={filteredItems} isShowItems={isShowItems} />
        </div>
      ) : (
        ""
      )} */}
      <ModalAddItem
        isOpen={isOpenModal}
        onClose={closeModalAddItem}
        updaeAddingItem={handleUpdateAddingItem}
      />
    </Container>
  );
}

export default Welcome;
