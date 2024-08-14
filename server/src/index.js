
require('dotenv').config();
console.log("EMAIL_USER:", process.env.EMAIL_USER); // Трябва да видите вашия имейл
console.log("EMAIL_PASS:", process.env.EMAIL_PASS); // Трябва да видите паролата за приложения
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const mongoose = require("mongoose");

const PORT = 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/dataApp")
  .then(() => console.log("DB successfully connected"))
  .catch((err) => console.log(err));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");

//   next();
// });
const corsOptions = {
  origin: "http://localhost:5173", // Заменете с адреса на вашия клиент
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));


app.get("/", (req, res) => {
  res.send("test ok");
});

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}....`));       
