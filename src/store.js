import { create } from "zustand";

export const useFileStore = create((set) => ({
  excelContent: null,
  fileName: "",
  addExcelContent: (arr) => set((state) => ({ excelContent: arr })),
  resetExcelContent: () => set({ excelContent: null, fileName: "" }),
  setFileName: (name) => set((state) => ({ fileName: name })),
}));
