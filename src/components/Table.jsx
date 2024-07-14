import { useFileStore } from "../store";
import dayjs from "dayjs";

const Table = () => {
  const excelContent = useFileStore((state) => state.excelContent);

  return (
    <div className="h-full mt-3 overflow-auto bg-white divide-y divide-gray-200 shadow-sm rounded-xl ring-1 ring-gray-950/5">
      {excelContent ? (
        <table className="table table-pin-rows">
          <thead>
            <tr>
              {excelContent[0].map((head, i) => (
                <th key={i}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelContent.slice(1).map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                {row.map((col, j) => (
                  <td key={j}>
                    {col instanceof Date
                      ? dayjs(col).format("MM-DD-YYYY")
                      : col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-sm text-gray-500">Pas de fichier chargé</div>
        </div>
      )}
    </div>
  );
};

export default Table;
