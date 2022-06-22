/** @format */

const { user: User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const MailChecker = require('mailchecker');

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // const username = name.trim().replace(/\s+/g, '-').toLowerCase();

  if (!name || !email || !password) {
    return res.status(401).json({
      message: 'Please provide name, email and password.',
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!MailChecker.isValid(email)) {
      return res.status(401).json({
        message: 'Please provide a valid email.',
      });
    } else {
      await User.findOne({ where: { email } }).then((user) => {
        if (user) {
          return res.status(401).json({
            message: 'Email already exists.',
          });
        } else {
          User.create({
            name,
            email,
            slug: name.trim().replace(/\s+/g, '-').toLowerCase(),
            password: hashedPassword,
          })
            .then((user) =>
              res.status(201).json({
                message: 'User created successfully.',
                userId: user.id,
              })
            )
            .catch((err) =>
              res.status(500).json({
                message: 'Failed to create account.',
                error: err.message,
              })
            );
        }
      });
    }
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: 'Please provide email and password.',
    });
  } else {
    const user = await User.findOne({ where: { email } });

    // console.log('ini hasil user', user);

    if (!user) {
      return res.status(401).json({
        message: 'User not found.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password.',
      });
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        userSlug: user.slug,
        userId: user.id,
      },
      'supersecret',
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      message: 'Login successful.',
      data: {
        token,
        userId: user.id,
        expired_at: moment().add(1, 'h').format('YYYY-MM-DD HH:mm:ss'),
      },
    });
  }
};
