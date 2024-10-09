import { useEffect, useState } from 'react';
import { FilterCollection } from '../sidebar/filter-collection';
import { Collections } from './collections';
import { deleteSpesificCollection, fetchGetMyCollection } from '../../../utils/fetch';
import useAuthStore from '../../../store/useAuthState';
import { ItemSchema } from '../../../validations/itemSchema';
import ModalItem from '../../items/modal-item';
import { HeaderCollection } from './my-collection.style';
// import { useNavigate } from "react-router-dom";

export function MyCollection() {
  const { user } = useAuthStore();
  const [collections, setCollections] = useState<ItemSchema[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedDetails, setSelectedDetails] = useState<ItemSchema | null>(null);
  const handleCollectionAccordingFilter = () => {};

  const fetchMyItems = async () => {
    const response = await fetchGetMyCollection(user!.id!);
    console.log('data', response);
    const items = response?.data.items;
    setCollections(items);
  };

  useEffect(() => {
    const asyncFetch = async () => {
      await fetchMyItems();
    };

    asyncFetch();
  }, []);

  // const OnOpen = async () => {
  //   if (selected.length === 0) return;

  //   setOpenEditModal(true);
  //   setSelectedDetails(null);

  //   try {
  //     const result = await getOneItem(selected[0]);
  //     if (result.data.success) {
  //       setSelectedDetails(result.data.item);
  //     } else {
  //       console.error('Failed to fetch item details');
  //       setOpenEditModal(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching item details:', error);
  //     setOpenEditModal(false);
  //   }
  // };

  const handleDeleteClick = async (item: ItemSchema) => {
    console.log(item);

    try {
      const result = await deleteSpesificCollection(item.id);
      if (result.data.success) {
        await fetchMyItems();
        console.log('Items deleted successfully');
      } else {
        console.error('Failed to delete items:', result.data.message);
      }
      console.log('Result:', result);
    } catch (error) {
      console.error('Error deleting items:', error);
    }
  };

  const handleSelect = (ids: string[]) => {
    setSelected(ids);
  };

  const handleEditItem = (selected: string[]) => {
    console.log('selected', selected);
  };

  const handleUpdateCollection = async () => {
    await fetchMyItems();
    setOpenEditModal(false);
    setSelectedDetails(null);
  };

  const closeModal = () => setOpenEditModal(false);

  const handleEditClick = async (item: ItemSchema) => {
    setOpenEditModal(true);
    setSelectedDetails(item);
  };

  return (
    <HeaderCollection>
      <FilterCollection onFilter={handleCollectionAccordingFilter} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '20px',
          }}
        >
          <Collections
            collections={collections}
            onSelect={handleSelect}
            selectedIds={selected}
            allowSelection={true}
            isMyCollection={true}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </div>
      </div>
      <ModalItem
        isOpen={openEditModal}
        onClose={closeModal}
        updateOrAddItem={() => handleEditItem(selected)}
        item={selectedDetails}
        onUpdateCollection={handleUpdateCollection}
      />
    </HeaderCollection>
  );
}
