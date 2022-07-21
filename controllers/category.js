/** @format */

const { category: Category } = require('../models');

exports.getAll = (req, res, next) => {
  Category.findAll()
    .then((categories) => {
      return res.status(200).json({
        message: 'success',
        categories,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getByName = (req, res, next) => {
  const { name } = req.params;
  Category.findOne({
    where: {
      category_name: name,
    },
  })
    .then((category) => {
      if (category) {
        return res.status(200).json({
          message: 'success',
          category,
        });
      } else {
        return res.status(404).json({
          message: 'not found',
          category,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getBySlug = (req, res, next) => {
  const { slug } = req.params;
  Category.findOne({
    where: {
      slug: slug,
    },
  })
    .then((category) => {
      if (category) {
        return res.status(200).json({
          message: 'success',
          category,
        });
      } else {
        return res.status(404).json({
          message: 'not found',
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};
