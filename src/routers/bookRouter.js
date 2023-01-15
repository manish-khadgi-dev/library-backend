import express from "express";
import {
  addBook,
  getAllBooks,
  getBookByIsbn,
} from "../models/books/BookModel.js";

const router = express.Router();

// get all books

router.get("/", async (req, res, next) => {
  try {
    const books = await getAllBooks();
    console.log(books);
    res.status(200).json({
      books,
    });
  } catch (error) {}
});

// add books

router.post("/", async (req, res, next) => {
  const { isbn } = req.body;

  try {
    const bookExists = await getBookByIsbn({ isbn });
    if (bookExists?._id) {
      return res.json({
        status: "error",
        message: "Book Already Exist, Please add New Book",
      });
    }
  } catch (error) {}

  try {
    const book = await addBook(req.body);
    if (book?._id) {
      return res.json({
        status: "success",
        message: "book added successfully",
      });
    }
    res.json({
      status: "error",
      message: "Unable to add books, Please try again Later",
    });
  } catch (error) {
    next();
  }
});

export default router;
