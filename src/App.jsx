import { Helmet, HelmetProvider } from "react-helmet-async";
import DropZone from "./components/DropZone";
import Table from "./components/Table";
import { useFileStore } from "./store";
import { transformColumn } from "./utils";
const App = () => {
  const excelContent = useFileStore((state) => state.excelContent);
  const fileName = useFileStore((state) => state.fileName);
  const resetExcelContent = useFileStore((state) => state.resetExcelContent);

  const reset = () => {
    resetExcelContent();
    document.getElementById("dropzone").value = null;
  };

  const download = () => {
    const data = excelContent
      .map((row) => {
        return row.map((col) => transformColumn(col)).join(";");
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
    <HelmetProvider>
      <Helmet>
        <title>Free Excel to CSV Converter</title>
        <meta name="description" content="Free Excel to CSV Converter" />
        <meta name="author" content="Koassi Akakpo (akakpo.koassi@gmail.com)" />
        <meta name="keywords" content="Excel,CSV,React,Tailwind" />
        <meta name="title" content="Free Online  Excel to CSV Converter" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Helmet>
      <div className="h-screen">
        <div className="flex flex-col w-full h-full max-w-5xl gap-5 p-5 mx-auto">
          <div className="max-w-4xl text-3xl font-semibold tracking-wide text-center text-gray-700 uppercase">
            Free Excel to csv converter
          </div>
          <DropZone />
          <Table />
          <div className="flex justify-between w-full">
            <button
              className="btn btn-sm"
              disabled={!excelContent}
              onClick={reset}
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
          <footer className="mt-auto text-sm text-center text-gray-400">
            ⓒ <a href="mailto:akakpo.koassi@gmail.com">Koassi Akakpo</a>
          </footer>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default App;
