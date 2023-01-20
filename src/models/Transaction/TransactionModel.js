import TransactionSchema from "./TransactionSchema.js";

export const postTransaction = (obj) => {
  return TransactionSchema(obj).save();
};

export const getAllTransactions = () => {
  return TransactionSchema.find();
};

export const getTransactionByQuery = () => {
  return TransactionSchema.findOne({
    "borrowedBy.userId": { $in: userId },
    "borrowedBook.isbn": { $in: userId },
  });
};
