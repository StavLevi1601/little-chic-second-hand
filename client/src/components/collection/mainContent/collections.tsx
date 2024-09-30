import { mockImage } from '../../../mock/collection-shop';
import { ItemSchema } from '../../../validations/itemSchema';
import { DetailsCollection } from './details-collection';
import {
  CollectionDetails,
  CollectionImage,
  CollectionSubContainer,
} from './shop-collection.style';

type Props = {
  collections: ItemSchema[];
  onSelect: (ids: string[]) => void;
  selectedIds: string[];
  allowSelection: boolean;
};

export function Collections({ collections, onSelect, selectedIds, allowSelection }: Props) {
  const isSelected = (id: string) => selectedIds.includes(id);

  const handleSelection = (id: string) => {
    if (!allowSelection) return;

    if (isSelected(id)) {
      const indexOfId = selectedIds.indexOf(id);
      const arrayWithoutIds = [...selectedIds];
      arrayWithoutIds.splice(indexOfId, 1);
      onSelect(arrayWithoutIds);
    } else {
      onSelect([...selectedIds, id]);
    }
  };

  return (
    <CollectionSubContainer>
      {collections.map((collection) => (
        <CollectionDetails key={collection.id}>
          <CollectionImage
            fontStyle={isSelected(collection.id) ? 'bold' : 'normal'}
            border={isSelected(collection.id) ? '2px solid gray' : 'none'}
            src={collection.image ? collection.image : mockImage}
            alt={`Collection Image ${collection.id + 1}`}
            onClick={() => handleSelection(collection.id)}
          />
          <DetailsCollection name={collection.name} price={collection.price} />
        </CollectionDetails>
      ))}
    </CollectionSubContainer>
  );
}
