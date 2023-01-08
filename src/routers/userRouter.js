import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { createUser, getUserByEmail } from "../models/user/UserModel.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  console.log("got hit by the router");
  next();
});

// Create USER

router.post("/", async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.json({
        status: "error",
        message: "User already Exist, Please login",
      });
    }

    //encrypt password
    const hashPass = hashPassword(req.body.password);
    if (hashPassword) {
      req.body.password = hashPass;
      const user = await createUser(req.body);

      if (user?._id) {
        return res.json({
          status: "success",
          message: "User has been created successfully",
        });
      }
      return res.json({
        status: "error",
        message: "User not created,, Please try again later",
      });
    }
  } catch (error) {
    next(error);
  }
});

//login User

router.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user?._id) {
      //Check if password is valid

      const isPassMatch = comparePassword(req.body.password, user.password);

      if (isPassMatch) {
        return res.json({
          status: "success",
          message: "Login Successfull",
          user,
        });
      }
      res.json({
        status: "error",
        message:
          "Either your  Email or Password do not match , Please reset and try again ",
      });
    } else {
      res.json({
        status: "error",
        message: "User not found",
      });
    }

    user.password = undefined;
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default router;
