import { useState } from "react";

type Props<T> = {
  filterItems: T[];
};

const ITEM_PER_PAGE = 5;

export function usePagination<T>({ filterItems }: Props<T>) {
  const [currentPage, setCurrentPages] = useState<number>(1);
  const maxPages = Math.ceil((filterItems?.length || 0) / ITEM_PER_PAGE);

  const nextPage = () => {
    if (currentPage < maxPages) {
      const page = currentPage + 1;
      setCurrentPages(page);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      const page = currentPage - 1;
      setCurrentPages(page);
    }
  };

  const getCurrentItems = () => {
    if (!filterItems || filterItems.length === 0) {
      return [];
    }
    const begin = (currentPage - 1) * ITEM_PER_PAGE;
    const end = begin + ITEM_PER_PAGE;
    return filterItems.slice(begin, end);
  };

  return { nextPage, previousPage, getCurrentItems, currentPage, maxPages };
}
