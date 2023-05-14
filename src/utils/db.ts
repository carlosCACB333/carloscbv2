import mongoose from "mongoose";
import { config } from "@/config";
import { log } from "console";

const connection = {
  isConnected: 0,
};

const dbConnection = async () => {
  try {
    if (connection.isConnected) {
      log("🟢 Using existing database connection");
      return;
    }
    const db = await mongoose.connect(config.mongoUrl, {});
    connection.isConnected = db.connections[0].readyState;
    log("🚀 Connected to database");
  } catch (error) {
    log(error);
    throw new Error("🟠 Error connecting to database");
  }
};

export default dbConnection;
