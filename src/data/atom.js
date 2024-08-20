import { atom } from "jotai";

export const PaginationData = atom({
  countAll: 0,
  setPage: null,
  deleteFunc: null,
  saveFunc: null,
  deleteData: null,
  deleteText: null,
  deleteClear: false,
  saveText: null,
});

export const shouldRenderHeaderState = atom({
  key: "shouldRenderHeader",
  default: false,
});
