/** @format */

const { bargain_product: BargainProduct } = require('../models');

exports.getAllByStatus = (req, res, next) => {
  const { status } = req.params;
  BargainProduct.findAll({
    where: {
      status,
    },
  })
    .then((bargain_products) => {
      res.status(200).json({
        message: 'success',
        bargain_products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusPending = (req, res, next) => {
  BargainProduct.findAll({
    where: {
      status: 'pending',
    },
  })
    .then((bargain_products) => {
      res.status(200).json({
        message: 'success',
        bargain_products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusSuccess = (req, res, next) => {
  BargainProduct.findAll({
    where: {
      status: 'success',
    },
  })
    .then((bargain_products) => {
      res.status(200).json({
        message: 'success',
        bargain_products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusFailed = (req, res, next) => {
  BargainProduct.findAll({
    where: {
      status: 'failed',
    },
  })
    .then((bargain_products) => {
      res.status(200).json({
        message: 'success',
        bargain_products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.getAllStatusCancelled = (req, res, next) => {
  BargainProduct.findAll({
    where: {
      status: 'cancelled',
    },
  })
    .then((bargain_products) => {
      res.status(200).json({
        message: 'success',
        bargain_products,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.createBargainProduct = (req, res, next) => {
  const { user_id, product_id, bargain_price } = req.body;
  BargainProduct.create({
    user_id,
    product_id,
    bargain_price,
    status: 'pending',
  })
    .then((bargain_product) => {
      res.status(200).json({
        message: 'success',
        bargain_product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.deleteBargainProduct = (req, res, next) => {
  const { id } = req.params;
  BargainProduct.destroy({
    where: {
      id,
    },
  })
    .then((bargain_product) => {
      res.status(200).json({
        message: 'success',
        bargain_product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};
