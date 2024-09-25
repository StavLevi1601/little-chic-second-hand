import { mockImage } from "../../../mock/collection-shop";
import { ItemSchema } from "../../../validations/itemSchema";
import { DetailsCollection } from "./details-collection";
import {
  CollectionDetails,
  CollectionImage,
  CollectionSubContainer,
} from "./shop-collection.style";

type Props = {
  collections: ItemSchema[];
  onSelect: (ids : string[]) => void;
  selectedIds: string[];
  allowSelection: boolean;

};

export function Collections({ collections,onSelect,selectedIds,allowSelection  }: Props) {

  const isSelected = (id: string)=> selectedIds.includes(id);

  const handleSelection = (id: string) => {
    if (!allowSelection) return; 
    console.log("stav");
    console.log("collection.id",id);
    
    console.log("isSelected(id)",isSelected(id));
    
    if (isSelected(id)) {
      const indexOfId = selectedIds.indexOf(id);
      console.log('indexOfId: ', indexOfId);
      
      const arrayWithoutIds =  [...selectedIds];
      arrayWithoutIds.splice(indexOfId,1);
      onSelect(arrayWithoutIds)
    } else {
      onSelect([...selectedIds,id])
    }
  }
  // const [arrayClicked, setArrayClicked] = useState<boolean[]>(() => new Array(collections.length).fill(false));    
  // const navigate = useNavigate();
  // const location = useLocation();

  // const isMyCollectionPage = location.pathname === "/my-collection";

  // useEffect(() => {
  //   if (!isMyCollectionPage) {
  //     setArrayClicked(new Array(collections.length).fill(false));
  //   }
  // }, [isMyCollectionPage, collections]);

  // const handleProductPage = (collection: ItemSchema, index: string) => {
  //   if (isMyCollectionPage) {
  //     setArrayClicked(prev => {
  //       const newArray = [...prev];
  //       newArray[index] = !newArray[index]; 
  //       onSelect(newArray)
  //       return newArray;
  //     });
  //   } else {
  //     navigate(`/items/${collection.id}`);
  //   }
  // };

  return (
    <CollectionSubContainer>
      {collections.map((collection) => (
        <CollectionDetails key={collection.id}>
          <CollectionImage fontStyle={isSelected(collection.id) ? 'bold' : 'normal'} border={isSelected(collection.id) ? '2px solid gray' : 'none'}
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
