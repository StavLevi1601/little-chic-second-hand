import { ItemSchema } from '../../validations/itemSchema';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props<T> = {
  columns: string[];
  getCurrentItems: () => ItemSchema[];
  previousPage: () => void;
  nextPage: () => void;
  currentPage: number;
  maxPages: number;
};

export function Table<T>({
  columns,
  getCurrentItems,
  previousPage,
  nextPage,
  currentPage,
  maxPages,
}: Props<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {getCurrentItems().map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>{item[column.toLowerCase() as keyof ItemSchema]}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns.length}>
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
