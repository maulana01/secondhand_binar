/** @format */

const { user: User } = require('../models');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator');
const emailTemplate = require('../utils/email-template');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dcdu2v41u',
  api_key: '189369424679696',
  api_secret: 'xO_NsHIMoLR3yqPLraq0I0yKbC0',
});

const otp = otpGenerator.generate(6, {
  lowerCaseAlphabets: false,
  upperCaseAlphabets: false,
  specialChars: false,
  digits: true,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'secondhandoffc@gmail.com',
    pass: 'ebzpltzyfembpnzo',
  },
});

exports.getAll = (req, res, next) => {
  console.log({ data: req.userLoggedin });
  User.findAll()
    .then((users) => {
      res.status(200).json({
        message: 'success',
        users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'failed',
        error: error.message,
      });
    });
};

exports.getById = (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          message: 'success',
          data: {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            profile_picture: user.profile_picture,
            profile_pictere_path: user.profile_picture_path,
            slug: user.slug,
            city_id: user.city_id,
          },
        });
      } else {
        return res.status(404).json({
          message: 'User not found',
        });
      }
    })
    .catch((error) => res.status(404).json({ message: 'failed', error }));
};

exports.getBySlug = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      slug: req.params.slug,
    },
  });
  if (user) {
    return res.status(200).json({
      message: 'success',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        slug: user.slug,
        address: user.address,
        profile_picture: user.profile_picture,
        profile_pictere_path: user.profile_picture_path,
        phone_number: user.phone_number,
        city_id: user.city_id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } else {
    return res.status(404).json({
      message: 'User not found',
    });
  }
};

exports.getMyProfile = (req, res, next) => {
  const { userId } = req.userLoggedin;
  User.findByPk(userId)
    .then((user) => {
      return res.status(200).json({
        message: 'success',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          slug: user.slug,
          address: user.address,
          profile_picture: user.profile_picture,
          profile_picture_path: user.profile_picture_path,
          phone_number: user.phone_number,
          city_id: user.city_id,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({ message: 'failed', error: err.message });
    });
};

exports.create = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const slug = name.trim().replace(/\s+/g, '-').toLowerCase();

  if (!name || !email || !password) {
    return res.status(401).json({
      message: 'Please provide name, email and password.',
    });
  }

  const user = await User.findOne({ where: { email } });

  if (user?.email === email) {
    return res.status(401).json({
      message: 'User already exists.',
    });
  }

  return await User.create({
    name,
    slug,
    email,
    password: hashedPassword,
  })
    .then((user) => {
      res.status(201).json({
        message: 'success',
        user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'failed',
        error,
      });
    });
};

exports.update = async (req, res, next) => {
  const { userId, userSlug } = req.userLoggedin;
  const { name, email, address, phone_number, city_id } = req.body;
  const user = await User.findByPk(userId);
  // const hashedPassword = bcrypt.hash(password, 12);
  const slug = name ? name.trim().replace(/\s+/g, '-').toLowerCase() : userSlug;
  const data = {
    slug: slug,
    name: name ? name : user.name,
    address: address || null,
    profile_picture: req.file ? req.file.filename.replace('public/images/avatar/', '') : null,
    profile_picture_path: req.file ? req.file.path : null,
    phone_number: phone_number || null,
    city_id: city_id || null,
  };

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  return await User.update(data, {
    where: {
      id: userId,
    },
  })
    .then((result) => res.status(200).json({ message: 'success', result }))
    .catch((error) => res.status(500).json({ message: 'failed', error: error.message }));
};

exports.delete = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  return User.destroy({
    where: {
      id,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(200).json({ message: 'success', user });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => res.status(500).json({ message: 'failed', error }));
};

exports.uploadAvatar = async (req, res, next) => {
  const id = req.params.id || req.body.id;

  const imageUrl = req.file.filename;

  if (!imageUrl) {
    const error = new Error('No image provided.');
    error.statusCode = 422;
    throw error;
  }

  const user = await User.findByPk(id);

  if (user.profile_picture) {
    clearImage(user.profile_picture);
  }

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
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
    .then((user) => res.status(200).json({ message: 'success', user }))
    .catch((error) => res.status(500).json({ message: 'failed', error }));
};

exports.resetPassword = async (req, res, next) => {
  const id = req.params.id || req.body.id;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  return User.update(
    { password: hashedPassword },
    {
      where: { id },
    }
  )
    .then((user) =>
      res.status(200).json({
        message: 'Password changed successfully',
        data: { userId: id },
      })
    )
    .catch((error) => res.status(500).json({ message: 'failed', error: error.message }));
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  let htmlEmailTemplate = emailTemplate(user.name, otp);

  return transporter
    .sendMail({
      from: 'SecondHand Official <secondhandoffc@gmail.com>',
      to: email,
      subject: 'Reset Password',
      html: htmlEmailTemplate,
    })
    .then((result) => {
      res.status(200).json({
        message: 'Reset password link has been sent to your email.',
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
      message: 'Invalid OTP',
    });
  }

  return res.status(200).json({
    message: 'OTP verified',
  });
};

const clearImage = (image) => {
  // filePath = path.join(__dirname, '../public/images/avatar', image);
  // fs.unlink(filePath, (err) => console.log(err));
  cloudinary.uploader.destroy(`public/images/avatar/${file.filename}`, function (result) {
    console.log(result);
  });
};
