import { useCallback } from 'react';

type SortConfig<T> = {
  items: T[];
  sortType: keyof T;
};

export function useSorting<T extends object>({ items, sortType }: SortConfig<T>) {
  const sortItems = useCallback((): T[] => {
    return [...items].sort((item1, item2) => {
      if (item1[sortType] < item2[sortType]) {
        return -1;
      }
      if (item1[sortType] > item2[sortType]) {
        return 1;
      }
      return 0;
    });
  }, [sortType, items]);

  return { sortType, sortItems };
}
