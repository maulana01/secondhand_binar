/** @format */

const { city: City } = require('../models');

exports.getAll = (req, res) => {
  City.findAll()
    .then((cities) => {
      res.status(200).json({
        message: 'success',
        data: cities,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: 'failed',
        error: err.message,
      });
    });
};

exports.getById = (req, res) => {
  City.findByPk(req.params.id)
    .then((city) => {
      if (city) {
        res.status(200).json({
          message: 'success',
          data: city,
        });
      } else {
        res.status(404).json({
          message: 'failed',
          error: 'city not found',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'failed',
        error: err.message,
      });
    });
};
