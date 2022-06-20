const { user: User } = require("../models");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const emailTemplate = require("../utils/email-template");

const otp = otpGenerator.generate(6, {
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
  digits: true,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "secondhandoffc@gmail.com",
    pass: "ebzpltzyfembpnzo",
  },
});

exports.getAll = (req, res, next) => {
  console.log({ data: req.userLoggedin });
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
            city_id: user.city_id,
          },
        });
      } else {
        return res.status(404).json({
          message: "User not found",
        });
      }
    })
    .catch((error) => res.status(404).json({ message: "failed", error }));
};

exports.create = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const username = name.trim().replace(/\s+/g, "-").toLowerCase();
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

  return await User.create({
    name,
    username,
    email,
    password: hashedPassword,
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
    username: req.body.username || null,
    name: req.body.name || null,
    email: req.body.email || null,
    password: req.body.password || null,
    gender: req.body.gender || null,
    address: req.body.address || null,
    profile_picture: req.file.filename || null,
    phone_number: req.body.phone_number || null,
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

exports.delete = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return User.destroy({
    where: {
      id,
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

exports.uploadAvatar = async (req, res, next) => {
  const id = req.params.id || req.body.id;

  const imageUrl = req.file.filename;

  if (!imageUrl) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  const user = await User.findByPk(id);

  if (user.profile_picture) {
    clearImage(user.profile_picture);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return await User.update(
    {
      profile_picture: imageUrl,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((user) => res.status(201).json({ message: "success", user }))
    .catch((error) => res.status(402).json({ message: "failed", error }));
};

exports.resetPassword = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  const { password } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(500).json({
      message: "User not found",
    });
  }

  return User.update(
    { password },
    {
      where: { id },
    }
  )
    .then((user) =>
      res.status(201).json({
        message: "Password changed successfully",
        data: { userId: id },
      })
    )
    .catch((error) => res.status(402).json({ message: "failed", error }));
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  let htmlEmailTemplate = emailTemplate(user.name, otp);

  return transporter
    .sendMail({
      from: "SecondHand Official <secondhandoffc@gmail.com>",
      to: email,
      subject: "Reset Password",
      html: htmlEmailTemplate,
    })
    .then((result) => {
      res.status(200).json({
        message: "Reset password link has been sent to your email.",
        data: {
          sendTo: email,
          messageId: result.messageId,
          userId: user.id,
          otp,
        },
      });
    });
};

exports.verifyOtp = async (req, res, next) => {
  if (otp !== req.body.otp) {
    return res.status(404).json({
      message: "Invalid OTP",
    });
  }

  return res.status(200).json({
    message: "OTP verified",
  });
};

const clearImage = (image) => {
  filePath = path.join(__dirname, "../public/images/avatar", image);
  fs.unlink(filePath, (err) => console.log(err));
};