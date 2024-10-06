import { useState } from 'react';
import { Icon } from '@iconify/react';
import pencilOutline from '@iconify-icons/mdi/pencil-circle';
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
  isMyCollection: boolean;
  onEditClick: (item: ItemSchema) => void;
};

export function Collections({
  collections,
  onSelect,
  selectedIds,
  allowSelection,
  isMyCollection,
  onEditClick,
}: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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

  const handleOver = (id: string) => {
    setHoveredId(id);
  };

  const handleLeave = () => {
    setHoveredId(null);
  };

  const handleEditClick = (e: React.MouseEvent, item: ItemSchema) => {
    e.stopPropagation();
    onEditClick(item);
  };

  const editIcon = (item: ItemSchema) => (
    <Icon
      icon={pencilOutline}
      onClick={(e) => handleEditClick(e, item)}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        fontSize: '24px',
        zIndex: 2,
      }}
    />
  );

  return (
    <CollectionSubContainer>
      {collections.map((collection) => (
        <CollectionDetails
          key={collection.id}
          onMouseOver={() => handleOver(collection.id)}
          onMouseLeave={handleLeave}
          style={{
            transform: hoveredId === collection.id ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {isMyCollection && hoveredId === collection.id && editIcon(collection)}
          <CollectionImage
            fontStyle={isSelected(collection.id) ? 'bold' : 'normal'}
            border={isSelected(collection.id) ? '2px solid gray' : 'none'}
            src={collection.image ? collection.image : mockImage}
            alt={`Collection Image ${collection.id + 1}`}
            onClick={() => handleSelection(collection.id)}
          />
          <DetailsCollection
            name={collection.name}
            price={collection.price}
            isHovered={hoveredId === collection.id}
            showAddToCard={!isMyCollection}
          />
        </CollectionDetails>
      ))}
    </CollectionSubContainer>
  );
}
