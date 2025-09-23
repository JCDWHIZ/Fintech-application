import mongoose from "mongoose";

export const ConnectToDb = async () => {
  if (!process.env.MONGO_URL) return null;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    //process.exit();
    console.log("An error occured", error);
  }
};
