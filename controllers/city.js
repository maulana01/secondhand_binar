/** @format */

const { city: City } = require('../models');

exports.getAll = (req, res) => {
  City.findAll()
    .then((cities) => {
      return res.status(200).json({
        message: 'success',
        data: cities,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'failed',
        error: err.message,
      });
    });
};

exports.getById = (req, res) => {
  City.findByPk(req.params.id)
    .then((city) => {
      if (city) {
        return res.status(200).json({
          message: 'success',
          data: city,
        });
      } else {
        return res.status(404).json({
          message: 'failed',
          error: 'city not found',
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'failed',
        error: err.message,
      });
    });
};
