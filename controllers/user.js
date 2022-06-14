const { user: User } = require("../models");
const bcrypt = require("bcryptjs");

exports.getAll = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json({
        message: "success",
        users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "failed",
        error,
      });
    });
};

exports.getById = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          message: "success",
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
        });
      } else {
        return res.status(200).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => res.status(404).json({ message: "failed", error }));
};

exports.create = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  if (!name || !email || !password) {
    return res.status(401).json({
      message: "Please provide name, email and password.",
    });
  }

  const user = await User.findOne({ where: { email } });
  if (user?.email === email) {
    return res.status(401).json({
      message: "User already exists.",
    });
  }

  console.log(user);
  return await User.create({
    name,
    email,
    password: hashedPassword,
    role_id: role,
  })
    .then((user) => {
      res.status(201).json({
        message: "success",
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "failed",
        error,
      });
    });
};

exports.update = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  const data = {
    username: req?.body?.username || null,
    name: req?.body?.name || null,
    email: req?.body?.email || null,
    password: req?.body?.password || null,
    gender: req?.body?.gender || null,
    address: req?.body?.address || null,
    profile_picture: req?.body?.profile_picture || null,
    phone_number: req?.body?.phone_number || null,
  };

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return await User.update(data, {
    where: {
      id,
    },
  })
    .then((result) => res.status(202).json({ message: "success", result }))
    .catch((error) => res.status(402).json({ message: "failed", error }));
};

exports.delete = (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(202).json({ message: "success", user });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => res.status(402).json({ message: "failed", error }));
};
