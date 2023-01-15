import Bookschema from "./BookSchema.js";

export const addBook = (bookInfo) => {
  return Bookschema(bookInfo).save();
};

export const getBookByIsbn = (isbn) => {
  return Bookschema.findOne({ isbn });
};

export const getAllBooks = () => {
  return Bookschema.find();
};
