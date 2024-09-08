import { useEffect, useMemo, useState } from "react";
import { Button, Container, Header, SearchingRow } from "./welcome.style";
import ModalAddItem from "../items/modal-add-item";

import { ItemSchema, SortKey, itemSchema } from "../../validations/itemSchema";
import { fetchGetItem } from "../../utils/fetch";
import { Backgrounds } from "../backgrounds/backgrounds";
import { SortCollection } from "../collection/sort-collection";
import { GetCollection } from "../collection/get-collection";

const sortKeys = Object.keys(itemSchema.shape) as unknown as Array<
  keyof ItemSchema
>;

function Welcome() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [items, setItems] = useState<ItemSchema[]>([]);

  const [sortType, setSortType] = useState<SortKey>(sortKeys[0]);
  const [isShowItems, setIsShowItems] = useState<boolean>(false);

  const filteredItems = useMemo(
    () =>
      [...items].sort((item1, item2) => {
        if (item1[sortType] < item2[sortType]) {
          return -1;
        }
        if (item1[sortType] > item2[sortType]) {
          return 1;
        }
        return 0;
      }),
    [items, sortType]
  );

  useEffect(() => {
    const fetchITems = async () => {
      const { data } = await fetchGetItem();
      setItems(data.data);
    };

    fetchITems();
  }, []);

  const showItems = async () => {
    setIsShowItems(true);
  };

  const openModalAddItem = () => {
    setIsOpenModal(true);
  };

  const closeModalAddItem = () => {
    setIsOpenModal(false);
  };

  const handleSortChange = (newSort: SortKey) => {
    setSortType(newSort);
  };

  return (
    <Container style={{ flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header>Little Chic</Header>
        <SearchingRow style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={showItems}>Shop Collection</Button>
          <Button>Our Story</Button>
          <Button>Gift Card</Button>
          <Button onClick={openModalAddItem}>Add item</Button>
        </SearchingRow>
      </div>
      <Backgrounds />
      {isShowItems ? (
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
      )}
      <ModalAddItem isOpen={isOpenModal} onClose={closeModalAddItem} />
    </Container>
  );
}

export default Welcome;
