import { useParams } from "react-router-dom";

export function ItemDetails() {
    const { itemId } = useParams();

    console.log("itemId",itemId);
    
    return (<div>
        
        </div>)
}