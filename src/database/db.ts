require("dotenv").config();
const { MONGO_USERNAME, MONGO_PASSWORD, DB_NAME } = process.env;
const mongoose = require("mongoose");

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.b954hsu.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const connectDB = async () => {
  await mongoose.connect(uri);
  console.log("# DB connected");
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("# DB disconnected");
};
