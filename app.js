/** @format */

const express = require('express');
const path = require('path');
const logger = require('morgan');

const categoriesRouter = require('./routes/category');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(categoriesRouter);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(3000, () => console.log('Server started on port 3000'));
