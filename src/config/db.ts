import mongoose from "mongoose";

const URL = process.env.MONGO_CLOUD_URL || "mongodb://localhost:27017/task";

export const configDB = () => {
  mongoose.connect(URL);
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error: "));
  db.once("open", () => {
    console.log("DATABASE CONNECTED");
  });
};
