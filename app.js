/** @format */

const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const categoriesRouter = require("./routes/category");
const productsRouter = require("./routes/product");
const transactionRotuer = require("./routes/transaction");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(usersRouter);
app.use(authRouter);
app.use(categoriesRouter);
app.use(productsRouter);
app.use(transactionRotuer);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(3000, () => console.log("Server started on port 3000"));
