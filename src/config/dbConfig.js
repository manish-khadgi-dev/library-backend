import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      return console.log(
        "MONGO URL is not define. Please provide a connection string"
      );
    }
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URL);

    conn
      ? console.log("Mongo DB connected")
      : console.error("Unable to connect to MongoDb");
  } catch (error) {
    console.log(error);
  }
};
