const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const { auth } = require("./middlewares/authMiddleware");
const PORT = 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/dataApp")
  .then(() => console.log("DB successfully connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(auth);

app.get("/", (req, res) => {
  res.send("test ok");
});

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}....`));
