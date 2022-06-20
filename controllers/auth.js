const { user: User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const username = name.trim().replace(/\s+/g, "-").toLowerCase();

  if (!name || !email || !password) {
    return res.status(401).json({
      message: "Please provide name, email and password.",
    });
  }

  await User.findOne({ where: { email } }).then((user) => {
    if (user) {
      return res.status(401).json({
        message: "Email already exists.",
      });
    } else {
      User.create({
        name,
        username,
        email,
        password: hashedPassword,
      })
        .then((user) =>
          res.status(201).json({
            message: "User created successfully.",
            userId: user.id,
          })
        )
        .catch((err) =>
          res.status(402).json({
            message: "Create user failed.",
            err,
          })
        );
    }
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: "Please provide email and password.",
    });
  }
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({
      message: "User not found.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password.",
    });
  }

  const token = jwt.sign(
    {
      email: user.email,
      username: user.username,
      userId: user.id,
    },
    "supersecret",
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).json({
    message: "Login successful.",
    data: {
      token,
      userId: user.id,
      expired_at: moment().add(1, "h").format("YYYY-MM-DD HH:mm:ss"),
    },
  });
};
