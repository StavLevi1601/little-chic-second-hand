import { DataCollection, CollectionText } from "./details-collection.style";

type Props = {
  name: string;
  price: number;
};
export function DetailsCollection({ name, price }: Props) {
  return (
    <>
      <DataCollection style={{ gap: "5px" }}>
        <CollectionText>{name}</CollectionText>
        <CollectionText>{price}₪</CollectionText>
        <button
          style={{ border: "1px solid gray", width: "100%", padding: "5px" }}
        >
          Add to cart
        </button>
      </DataCollection>
    </>
  );
}
