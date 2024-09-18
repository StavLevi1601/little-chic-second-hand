import { Button } from "../collection.style";

type Props = {
  onAddItem: () => void;
};

export function AddCollection({ onAddItem }: Props) {
  return <Button onClick={onAddItem}>Add Item</Button>;
}
