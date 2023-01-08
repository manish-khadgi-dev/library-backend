import UserSchema from "./UserSchema.js";

export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

export const createUser = (userData) => {
  return UserSchema(userData).save();
};
