import express from "express";
import cors from "cors";
import mainRouter from "./routes";
import { connectDB } from "./database/db";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error: any) {
    res.status(502).json({ error: "Unable to connect to database" });
    console.log(error.message);
  }
});

app.use("/anime", mainRouter);

app.listen(PORT, () => {
  console.log("Server listening in port", PORT);
});

module.exports = app;
