 import { useEffect, useState } from "react";
import { FilterCollection } from "../sidebar/filter-collection";
import { Collections } from "./collections";
import { deleteSpesificCollection, fetchGetMyCollection } from "../../../utils/fetch";
import useAuthStore from "../../../store/useAuthState";
import { ItemSchema } from "../../../validations/itemSchema";
import { Button } from "../collection.style";

export function MyCollection() {
  const {user} = useAuthStore();
  const [collections,setCollections] = useState<ItemSchema[]>([]);

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

  const handleDeleteItem = () => {

  }

  const handleClickedItems = async (arrayClicked: boolean[]) => {
    console.log(arrayClicked);
    console.log(collections);
    
    const collectionsDelete = collections.filter((collection, index) => arrayClicked[index] === true);
    
    try {
      const result = await deleteSpesificCollection(collectionsDelete);
      
      // השהייה של שנייה אחת
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (result.data.success) {
        setCollections((prev) => {
          const newCollection = prev.filter((collection, index) => arrayClicked[index] === false);
          return newCollection;
        });
        
        // כאן אפשר להוסיף הודעה למשתמש על הצלחת המחיקה
        console.log("Items deleted successfully");
      } else {
        // טיפול במקרה שהמחיקה לא הצליחה
        console.error("Failed to delete items:", result.data.message);
      }
      
      console.log("Result:", result);
    } catch (error) {
      // טיפול בשגיאות
      console.error("Error deleting items:", error);
      // כאן אפשר להוסיף הודעת שגיאה למשתמש
    }
  };


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
            <Button>Edit item</Button>

          </div>
        </div>
      </div>
    </div>
  );
}
