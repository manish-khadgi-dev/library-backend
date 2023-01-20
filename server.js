import dotenv from "dotenv";
dotenv.config();

import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

import cors from "cors";
import morgan from "morgan";

//connect DB
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

//middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//API routers
import userRouter from "./src/routers/userRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import transactionRouter from "./src/routers/transactionRouter.js";
import { isAuth } from "./src/middlewares/authMiddleware.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", isAuth, bookRouter);
app.use("/api/v1/transaction", isAuth, transactionRouter);

//uncaugh router hanlder   page not found hanlde garna laiX
app.use("*", (req, res) => {
  const error = {
    errorCode: 404,
    message: "Requested resouces not found",
  };
});

//global error hanlder   page 500 server hanlde garna lai
app.use((error, req, res, next) => {
  try {
    console.log(error.message);
    const errorCode = error.errorCode || 500;

    res.status(errorCode).json({
      status: "error",
      message: error.message,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

//Run the server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server us running at http://localhost:${PORT}`);
});
