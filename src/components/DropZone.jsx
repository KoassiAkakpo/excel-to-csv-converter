import readXlsxFile from "read-excel-file";
import { useFileStore } from "../store";
import { FormattedMessage } from "react-intl";

const DropZone = () => {
  const addExcelContent = useFileStore((state) => state.addExcelContent);
  const setFileName = useFileStore((state) => state.setFileName);
  const fileName = useFileStore((state) => state.fileName);
  const fileChange = (event) => {
    if (!event) return;
    const file = event.target.files[0];
    setFileName(file.name.split(".")[0]);
    readXlsxFile(file).then((rows) => {
      addExcelContent(rows);
    });
  };
  return (
    <div>
      <label
        htmlFor="dropzone"
        className="flex flex-col items-center w-full p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer rounded-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        <h2 className="mt-1 font-medium tracking-wide text-gray-700">
          <FormattedMessage id="app.file" />
        </h2>
        <p className="mt-2 text-xs tracking-wide text-gray-500">
          {fileName ? (
            fileName
          ) : (
            <span>
              <FormattedMessage id="app.upload" />
            </span>
          )}
        </p>
        <input
          id="dropzone"
          type="file"
          onChange={fileChange}
          className="hidden"
          accept=".xlsx,.xls"
        />
      </label>
    </div>
  );
};

export default DropZone;
