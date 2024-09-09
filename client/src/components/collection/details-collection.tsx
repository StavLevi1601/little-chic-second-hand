import { DataCollection, CollectionText } from "./details-collection.style";

type Props = {
  name: string;
  price: number;
};
export function DetailsCollection({ name, price }: Props) {
  return (
    <>
      <DataCollection>
        <CollectionText>{name}</CollectionText>
        <CollectionText>{price}₪</CollectionText>
      </DataCollection>
    </>
  );
}
