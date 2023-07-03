import express from "express";
import cors from "cors";
const connectDB = require("./database/db");

import mainRouter from "./routes";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/anime", mainRouter);

app.listen(PORT, () => {
  console.log("Server listening in port", PORT);
});

module.exports = app;
