/** @format */

const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("docs.yml");
const path = require("path");
// const logger = require('morgan');
const bodyParser = require("body-parser");
const cityRouter = require("./routes/city");
const usersRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const categoriesRouter = require("./routes/category");
const productsRouter = require("./routes/product");
const discProductsOfferRouter = require("./routes/discount_product_offer");
const wishlistRouter = require("./routes/wishlist");
const transactionRotuer = require("./routes/transaction");

const notifUser = require("./routes/notif");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + 'public'));
app.use('/public/images/avatar', express.static('public/images/avatar'));
app.use('/public/images/products', express.static('public/images/products'));


app.use(cityRouter);
app.use(usersRouter);
app.use(authRouter);
app.use(categoriesRouter);
app.use(productsRouter);
app.use(discProductsOfferRouter);
app.use(wishlistRouter);
app.use(transactionRotuer);
app.use(notifUser);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.get("/", (req, res) => {
  res.redirect("/docs");
});

module.exports = app;
