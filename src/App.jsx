import DropZone from "./components/DropZone";
import Table from "./components/Table";
import { useFileStore } from "./store";
import dayjs from "dayjs";
const App = () => {
  const excelContent = useFileStore((state) => state.excelContent);
  const fileName = useFileStore((state) => state.fileName);
  const resetExcelContent = useFileStore((state) => state.resetExcelContent);
  const download = () => {
    const data = excelContent
      .map((row) => {
        return row
          .map((col) =>
            col instanceof Date ? dayjs(col).format("MM-DD-YYYY") : col
          )
          .join(";");
      })
      .join("\n");

    const blob = new Blob([data], { type: "text/csv" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor tag for downloading
    const a = document.createElement("a");

    // Set the URL and download attribute of the anchor tag
    a.href = url;
    a.download = fileName + ".csv";

    // Trigger the download by clicking the anchor tag
    a.click();
  };
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="flex flex-col w-full h-full max-w-5xl gap-5 p-5 mx-auto">
        <div className="max-w-4xl text-3xl font-semibold tracking-wide text-center text-gray-700 uppercase">
          Free Excel to csv converter
        </div>
        <DropZone />
        <Table />
        <div className="flex justify-between w-full mt-auto">
          <button
            className="btn btn-sm"
            disabled={!excelContent}
            onClick={resetExcelContent}
          >
            Annuler
          </button>
          <button
            className="btn btn-neutral btn-sm"
            disabled={!excelContent}
            onClick={download}
          >
            Télécharger le fichier CSV
          </button>
        </div>
        <footer className="text-sm text-center text-gray-400">
          ⓒ <a href="mailto:akakpo.koassi@gmail.com">Koassi Akakpo</a>
        </footer>
      </div>
    </div>
  );
};

export default App;
