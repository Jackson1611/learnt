require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

port = 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
