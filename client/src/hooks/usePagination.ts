import { useState } from "react";

type Props<T> = {
  items: T[];
};

export function usePagination<T>({ items }: Props<T>) {
  const [currentPage, setCurrentPages] = useState<number>(1);
  const itemsPerPage = 5;
  const maxPages = Math.ceil((items?.length || 0) / itemsPerPage);

  const nextPage = () => {
    setCurrentPages((prevPage: number) =>
      prevPage < maxPages ? prevPage + 1 : prevPage
    );
  };

  const previousPage = () => {
    setCurrentPages((prevPage: number) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const currentItems = () => {
    if (!items || items.length === 0) {
      return [];
    }
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return items.slice(begin, end);
  };

  return { nextPage, previousPage, currentItems, currentPage, maxPages };
}
