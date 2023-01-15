import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    year: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    borrowedBy: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("book", userSchema); // users
