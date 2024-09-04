import { useEffect, useState } from "react";
import { Button, Container, Header, SearchingRow } from "./welcome.style";
import ModalAddItem from "../items/modal-add-item";

import { ItemSchema, SortKey } from "../../validations/itemSchema";
import { fetchGetItem } from "../../utils/fetch";
import { usePagination } from "../../hooks/usePagination";
import { Backgrounds } from "../backgrounds/backgrounds";
import { SortCollection } from "../sortCollection/sort-collection";

function Welcome() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [items, setItems] = useState<ItemSchema[]>([]);
  const [filterItems, setFilterItems] = useState<ItemSchema[]>([]);
  const [sortType, setSortType] = useState<SortKey>("Title");
  const [isShowItems, setIsShowItems] = useState<boolean>(false);

  const { getCurrentItems, nextPage, previousPage, currentPage, maxPages } =
    usePagination<ItemSchema>({
      filterItems,
    });

  const showItems = async () => {
    setIsShowItems(true);
    const sortedItems = sortItems(items, sortType);
    setFilterItems(sortedItems);
  };

  const openModalAddItem = () => {
    setIsOpenModal(true);
  };

  const closeModalAddItem = () => {
    setIsOpenModal(false);
  };

  const handleSortChange = (newSort: SortKey) => {
    setSortType(newSort);
    const sortedItems = sortItems(items, sortType);
    ///
    setFilterItems(sortedItems);
  };

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

  useEffect(() => {
    const fetchITems = async () => {
      const { data } = await fetchGetItem();
      setItems(data.data);
    };

    fetchITems();
  }, []);

  useEffect(() => {
    const sortedItems = sortItems(items, sortType);
    setFilterItems(sortedItems);
  }, [sortType, items]);

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
        {filterItems.length > 0 && isShowItems ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>title</th>
                  <th>body</th>
                  <th>price</th>
                  <th>size</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item, key) => (
                  <tr key={key}>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    <td>{item.price}</td>
                    <td>{item.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <button onClick={previousPage}>Back</button>
              <button onClick={nextPage}>Next</button>
            </div>
            <div>
              The page is {currentPage} from {maxPages}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <ModalAddItem isOpen={isOpenModal} onClose={closeModalAddItem} />
    </Container>
  );
}

export default Welcome;
