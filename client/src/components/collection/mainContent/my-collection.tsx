 import { useEffect, useState } from "react";
import { FilterCollection } from "../sidebar/filter-collection";
import { Collections } from "./collections";
import { deleteSpesificCollection, fetchGetMyCollection } from "../../../utils/fetch";
import useAuthStore from "../../../store/useAuthState";
import { ItemSchema } from "../../../validations/itemSchema";
import { Button } from "../collection.style";
// import { useNavigate } from "react-router-dom";

export function MyCollection() {
  const {user} = useAuthStore();
  // const navigation = useNavigate();
  const [collections,setCollections] = useState<ItemSchema[]>([]);
  const [selected,setSelected] = useState<string[]>([]);
  // const [collectionsArrayClicked,setCollectionArrayClicked] = useState<boolean[]>(() => Array(collections.length).fill(false));
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



  const handleDeleteItem = async () => {
    console.log(collections);
    console.log("selected stav",selected);
    
    
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
            {/* <Button onClick={hanedleEditItem}>Edit item</Button> */}

          </div>
        </div>
      </div>
    </div>
  );
}
