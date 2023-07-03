"use strict";
const express = require("express");
const cors = require("cors");
// const connectDB = require("./src/db");
// const router = require("./src/routes");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());
//
// app.use("/anime", router);
app.listen(PORT, () => {
    console.log("Server listening in port", PORT);
});
module.exports = app;
