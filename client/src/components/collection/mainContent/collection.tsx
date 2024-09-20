import { useNavigate } from "react-router-dom";
import { mockImage } from "../../../mock/collection-shop";
import { ItemSchema } from "../../../validations/itemSchema";
import { DetailsCollection } from "./details-collection";
import { CollectionDetails, CollectionImage } from "./shop-collection.style";

type Props = {
  collections: ItemSchema[];
};

export function Collection({ collections }: Props) {
  const navigate = useNavigate();

  const handleProductPage = (collection: ItemSchema) => {
    navigate(`/items/${collection.id}`);
  };
  return (
    <div>
      {collections.map((collection, index) => (
        <CollectionDetails key={index}>
          <CollectionImage
            src={collection.image ? collection.image : mockImage}
            alt={`Collection Image ${index + 1}`}
            onClick={() => handleProductPage(collection)}
          />
          <DetailsCollection name={collection.name} price={collection.price} />
        </CollectionDetails>
      ))}
    </div>
  );
}
