const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("DB successfully connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}....`));
