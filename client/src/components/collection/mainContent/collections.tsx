import { useState } from 'react';
import pencilOutline from '@iconify-icons/mdi/pencil-circle';
import trashOutline from '@iconify-icons/mdi/trash-circle';

import { mockImage } from '../../../mock/collection-shop';
import { ItemSchema } from '../../../validations/itemSchema';
import { DetailsCollection } from './details-collection';
import {
  CollectionDetails,
  CollectionImage,
  CollectionSubContainer,
} from './shop-collection.style';
import { IconContainer, IconWrapper, StyledIcon } from './collections.styled';

type Props = {
  collections: ItemSchema[];
  onSelect: (ids: string[]) => void;
  selectedIds: string[];
  allowSelection: boolean;
  isMyCollection: boolean;
  onEditClick?: (item: ItemSchema) => void;
  onDeleteClick?: (item: ItemSchema) => void;
};

export function Collections({
  collections,
  onSelect,
  selectedIds,
  allowSelection,
  isMyCollection,
  onEditClick,
  onDeleteClick,
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
    if (onEditClick && item) {
      onEditClick(item);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, item: ItemSchema) => {
    e.stopPropagation();
    if (onDeleteClick && item) {
      onDeleteClick(item);
    }
  };

  const editIcon = (item: ItemSchema) => (
    <IconWrapper onClick={(e) => handleEditClick(e, item)}>
      <StyledIcon icon={pencilOutline} />
    </IconWrapper>
  );

  const deleteIcon = (item: ItemSchema) => (
    <IconWrapper onClick={(e) => handleDeleteClick(e, item)}>
      <StyledIcon icon={trashOutline} />
    </IconWrapper>
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
          {isMyCollection && hoveredId === collection.id && (
            <IconContainer>
              {editIcon(collection)}
              {deleteIcon(collection)}
            </IconContainer>
          )}
          <CollectionImage
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
