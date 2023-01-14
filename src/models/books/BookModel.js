import Bookschema from "./BookSchema.js";

export const addBook = (bookInfo) => {
  return Bookschema(bookInfo).save();
};
