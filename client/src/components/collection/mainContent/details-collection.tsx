import { DataCollection, CollectionText } from './details-collection.style';

type Props = {
  name: string;
  price: number;
  isHovered: boolean;
  showAddToCard: boolean | null;
};
export function DetailsCollection({ name, price, isHovered, showAddToCard }: Props) {
  return (
    <>
      <DataCollection style={{ gap: '5px' }}>
        {isHovered && showAddToCard ? (
          <button style={{ border: '1px solid gray', width: '179px', padding: '3px' }}>
            Add to cart
          </button>
        ) : null}
        <CollectionText>{name}</CollectionText>
        <CollectionText>{price}₪</CollectionText>
      </DataCollection>
    </>
  );
}
