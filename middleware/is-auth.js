/** @format */

const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return res.status(401).json({
      error: 'Not authenticated.',
    });
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, 'supersecret');
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
  if (!decodedToken) {
    return res.status(401).json({
      error: 'Not authenticated.',
    });
  }
  req.userLoggedin = decodedToken;
  next();
};
