import { usePagination } from '../../../hooks/usePagination';
import { ItemSchema } from '../../../validations/itemSchema';
import { Table } from '../../table/table';

type Props = {
  items: ItemSchema[];
  isShowItems: boolean;
};

const columns = ['Title', 'Body', 'Price', 'Size'];

export function GetCollection({ items, isShowItems }: Props) {
  const { getCurrentItems, nextPage, previousPage, currentPage, maxPages } =
    usePagination<ItemSchema>({
      filterItems: items,
    });

  if (items.length === 0 && !isShowItems) {
    return null;
  }

  return (
    <Table
      columns={columns}
      getCurrentItems={getCurrentItems}
      previousPage={previousPage}
      nextPage={nextPage}
      currentPage={currentPage}
      maxPages={maxPages}
    />
  );
}
