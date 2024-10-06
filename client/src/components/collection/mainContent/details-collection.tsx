import { DataCollection, CollectionText, ButtonAddToCart } from './details-collection.style';

type Props = {
  name: string;
  price: number;
  isHovered: boolean;
  showAddToCard: boolean | null;
};
export function DetailsCollection({ name, price, isHovered, showAddToCard }: Props) {
  return (
    <>
      <DataCollection>
        {isHovered && showAddToCard ? <ButtonAddToCart>Add to cart</ButtonAddToCart> : null}
        <CollectionText>{name}</CollectionText>
        <CollectionText>{price}₪</CollectionText>
      </DataCollection>
    </>
  );
}
