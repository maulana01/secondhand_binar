/** @format */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    // const error = new Error('Not authenticated.');
    // error.statusCode = 401;
    // throw error;
    res.status(401).json({
      error: 'Not Authenticated.',
    });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'supersecret');
  } catch (err) {
    // err.statusCode = 500;
    // throw err;
    res.status(500).json({
      error: err.message,
    });
  }
  if (!decodedToken) {
    // const error = new Error('Not authenticated.');
    // error.statusCode = 401;
    // throw error;
    res.status(401).json({
      error: 'Not Authenticated.',
    });
  }
  req.userLoggedin = decodedToken;
  next();
};
