const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");

const port = 8000;
const MONGO_DB = "mongodb://127.0.0.1:27017/todos";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongoose
  .connect(MONGO_DB)
  .then(() => app.listen(port, () => console.log(`listening on port ${port}`)))
  .catch((error) => console.log(error));

app.use("/auth", authRoutes);
