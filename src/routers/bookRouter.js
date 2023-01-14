import express from "express";
import { addBook } from "../models/books/BookModel.js";

const router = express.Router();

// add books

router.post("/", async (req, res, next) => {
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
