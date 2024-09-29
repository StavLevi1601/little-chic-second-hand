 import { useEffect, useState } from "react";
import { FilterCollection } from "../sidebar/filter-collection";
import { Collections } from "./collections";
import { deleteSpesificCollection, fetchGetMyCollection, getOneItem } from "../../../utils/fetch";
import useAuthStore from "../../../store/useAuthState";
import { ItemSchema } from "../../../validations/itemSchema";
import { Button } from "../collection.style";
import ModalItem from "../../items/modal-item";
// import { useNavigate } from "react-router-dom";

export function MyCollection() {
  const {user} = useAuthStore();
  const [collections,setCollections] = useState<ItemSchema[]>([]);
  const [selected,setSelected] = useState<string[]>([]);
  const [openEditModal,setOpenEditModel] = useState<boolean>(false);
  const [selectedDetails,setSelectedDetails] = useState<ItemSchema | null>(null)
  const handleCollectionAccordingFilter = () => {};
  
  const fetchMyItems = async () => {  
    const response = await fetchGetMyCollection(user!.id!);
    console.log("data",response);
    const items  = response?.data.items;
    setCollections(items)
  }
  
  useEffect(()=> {
    const asyncFetch = async () => {      

    await fetchMyItems();
    }

    asyncFetch()
  },[])


  const OnOpen = async () => {
    if (selected.length === 0) return;
    
    setOpenEditModel(true); 
    setSelectedDetails(null);
  
    try {
      const result = await getOneItem(selected[0]);
      if (result.data.success) {
        setSelectedDetails(result.data.item);
      } else {
        console.error("Failed to fetch item details");
        setOpenEditModel(false);
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
      setOpenEditModel(false);
    }
  };
      

  

  const handleDeleteItem = async () => {
    console.log(collections);    
    
    try {
      const result = await deleteSpesificCollection(selected);
      if (result.data.success) {
        await fetchMyItems();
        console.log("Items deleted successfully");
      } else {
        console.error("Failed to delete items:", result.data.message);
      }
      console.log("Result:", result);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  }

  const handleSelect = (ids: string[]) => {
    setSelected(ids)
  }

  const handleEditItem = (selected: string[]) => {
    console.log("selected",selected);
    
  }

  const handleUpdateCollection = async () => {
    await fetchMyItems();
    setOpenEditModel(false); 
    setSelectedDetails(null);
  }
  

  const closeModal = () => setOpenEditModel(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FilterCollection onFilter={handleCollectionAccordingFilter} />
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "flex-end",
            padding: "20px",
          }}
        >
      <Collections collections={collections} onSelect={handleSelect} selectedIds={selected} allowSelection={true} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
            }}
          >
            <Button onClick={handleDeleteItem}>Delete item</Button>
            <Button onClick={OnOpen}>Edit item</Button>

          </div>
        </div>
      </div>
      <ModalItem
      isOpen={openEditModal}
      onClose={closeModal}
      updateOrAddItem={()=> handleEditItem(selected)}
      item={selectedDetails}
      onUpdateCollection={handleUpdateCollection}
    /> 
    </div>
       );
}