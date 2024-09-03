import { ItemSchema } from "../validations/itemSchema";
import { usePagination } from "./usePagination";

type Props = {
  items: ItemSchema[];
};

export function ExpansionTable({ items }: Props) {
  const { getCurrentItems, nextPage, previousPage, currentPage, maxPages } =
    usePagination<ItemSchema>({
      filterItems: items,
    });

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Body</th>
          <th>Price</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        {getCurrentItems().map((item) => (
          <tr>
            <td>{item.title}</td>
            <td>{item.body}</td>
            <td>{item.price}</td>
            <td>{item.size}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>
            <button onClick={previousPage}>Previous</button>
            <button onClick={nextPage}>Next</button>
            <span>
              Page {currentPage} of {maxPages}
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
