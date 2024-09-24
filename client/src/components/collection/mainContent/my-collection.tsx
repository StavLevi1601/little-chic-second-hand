 import { useEffect, useState } from "react";
import { FilterCollection } from "../sidebar/filter-collection";
import { Collections } from "./collections";
import { deleteSpesificCollection, fetchGetMyCollection } from "../../../utils/fetch";
import useAuthStore from "../../../store/useAuthState";
import { ItemSchema } from "../../../validations/itemSchema";
import { Button } from "../collection.style";
import { useNavigate } from "react-router-dom";

export function MyCollection() {
  const {user} = useAuthStore();
  const navigation = useNavigate();
  const [collections,setCollections] = useState<ItemSchema[]>([]);
  const [collectionsArrayClicked,setCollectionArrayClicked] = useState<boolean[]>(() => Array(collections.length).fill(false));
  const handleCollectionAccordingFilter = () => {};

  useEffect(()=> {
    const fetchMyItems = async () => {      
    const response = await fetchGetMyCollection(user?.id ? user?.id : "111");
    console.log("data",response);
    const items  = response?.data.items;
    setCollections(items)
    }

    fetchMyItems()
  },[])

  const handleDeleteItem = async () => {
    console.log(collectionsArrayClicked);
    console.log(collections);
    
    const collectionsDelete = collections.filter((collection, index) => collectionsArrayClicked[index] === true);
    
    try {
      const result = await deleteSpesificCollection(collectionsDelete);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (result.data.success) {
        setCollections((prev) => {
          const newCollection = prev.filter((collection, index) => collectionsArrayClicked[index] === false);
          return newCollection;
        });
        
        console.log("Items deleted successfully");
      } else {
        console.error("Failed to delete items:", result.data.message);
      }
      
      console.log("Result:", result);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  }

  const handleClickedItems = async (arrayClicked: boolean[]) => {
    console.log("arrayClicked",arrayClicked);
    
    setCollectionArrayClicked(arrayClicked)
  };

  const handleEditItem = () => {
    console.log("collectionsArrayClicked",collectionsArrayClicked);
    const collectionEdit : ItemSchema[] = collections.filter((collection, index) => collectionsArrayClicked[index] === true);
    if (collectionEdit.length>1) {
      console.log("you can edit just one item");
      return
    }
    if (collectionEdit.length===0) {
      console.log("you need to choose a one item");
      return

    }

    console.log("collectionEdit",collectionEdit);
    navigation(`/items/${collectionEdit[0].id}`);
    return

    
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
      <Collections collections={collections} onClickHandle={handleClickedItems} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
            }}
          >
            <Button onClick={handleDeleteItem}>Delete item</Button>
            <Button onClick={handleEditItem}>Edit item</Button>

          </div>
        </div>
      </div>
    </div>
  );
}
