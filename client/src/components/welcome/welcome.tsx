import { useEffect, useState } from "react";
import { Button, Container, Header, SearchingRow } from "./welcome.style";
import ModalAddItem from "../items/modal-add-item";
import background1 from "../../assets/images/background-child1.webp";
import background2 from "../../assets/images/background-child2.webp";
import background3 from "../../assets/images/background-child3.webp";
import background4 from "../../assets/images/background-child4.jpg";
import background5 from "../../assets/images/background-child5.jpg";
import { ItemSchema } from "../../validations/itemSchema";
import { fetchGetItem } from "../../utils/fetch";
import { usePagination } from "../../hooks/usePagination";

const backgrounds = [
  `url(${background1})`,
  `url(${background2})`,
  `url(${background3})`,
  `url(${background3})`,
  `url(${background4})`,
  `url(${background5})`,
];

function Welcome() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentBackground, setCurrentBackground] = useState<number>(0);
  const [items, setItem] = useState<ItemSchema[]>([]);
  const { currentItems, nextPage, previousPage, currentPage, maxPages } =
    usePagination<ItemSchema>({
      items,
    });

  const showItems = async () => {
    const { data } = await fetchGetItem();
    console.log("data", data.data);

    setItem(data.data);
  };

  const openModalAddItem = () => {
    setIsOpenModal(true);
  };

  const closeModalAddItem = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prevBackground) =>
        prevBackground === backgrounds.length - 1 ? 0 : prevBackground + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  });

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
      <div
        style={{
          marginTop: "20px",
          height: "400px",
          backgroundImage: backgrounds[currentBackground],
        }}
      ></div>
      <div>
        The page is {currentPage} from {maxPages}
        {items.length > 0 ? (
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
                {currentItems().map((item, key) => (
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
