import { useEffect, useMemo, useState } from "react";
import { Button, Container, Header, SearchingRow } from "./welcome.style";
import ModalAddItem from "../items/modal-add-item";

import { ItemSchema, SortKey } from "../../validations/itemSchema";
import { fetchGetItem } from "../../utils/fetch";
import { Backgrounds } from "../backgrounds/backgrounds";
import { SortCollection } from "../sortCollection/sort-collection";
import { ExpansionTable } from "../table/expansion-table";
// import { useSorting } from "../../hooks/useSorting";

const sortItems = (items: ItemSchema[], sortKey: SortKey): ItemSchema[] => {
  return [...items].sort((a, b) => {
    switch (sortKey) {
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
};

function Welcome() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [items, setItems] = useState<ItemSchema[]>([]);
  const [sortType, setSortType] = useState<SortKey>("Title");
  const [isShowItems, setIsShowItems] = useState<boolean>(false);

  // const {sortType,setSortType,sortItems} = useSorting();

  useEffect(() => {
    const fetchITems = async () => {
      const { data } = await fetchGetItem();
      setItems(data.data);
    };

    fetchITems();
  }, []);

  const filteredItems = useMemo(
    () => sortItems(items, sortType),
    [items, sortType]
  );

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

      <div>
        <SortCollection onSortChange={handleSortChange} />
        <ExpansionTable items={filteredItems} isShowItems={isShowItems} />
      </div>
      <ModalAddItem isOpen={isOpenModal} onClose={closeModalAddItem} />
    </Container>
  );
}

export default Welcome;
