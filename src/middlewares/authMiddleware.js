import { getUser } from "../models/user/UserModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);
    const user = authorization ? await getUser({ id: authorization }) : null;
    user?._id
      ? next()
      : res.json({ status: "error", message: "Unauthorized User" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
