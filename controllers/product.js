/** @format */

const {
  product: Product,
  Sequelize,
  product_images: Product_Images,
  category: Category,
  user: User,
  order_transaction: Transaction,
  notification: Notification,
  discount_product_offer: DiscProduct,
} = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { Op } = Sequelize;
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dcdu2v41u',
  api_key: '189369424679696',
  api_secret: 'xO_NsHIMoLR3yqPLraq0I0yKbC0',
});

exports.getAllWithPaginationSortingFiltering = (req, res, next) => {
  const { page, limit, filter } = req.query;
  if (filter) {
    if (filter == '') {
      return res.status(200).json({
        message: 'success',
        products: {
          count: 0,
          rows: [],
        },
        current_page: 1,
        total_pages: 1,
        total_items: 0,
      });
    } else {
      const query = {
        offset: (page - 1) * limit || 0,
        limit: parseInt(limit, 10) || 10,
        where: {
          product_name: {
            [Op.iLike]: `%${filter}%`,
          },
          status: 'unsold',
        },
        include: [
          {
            model: Category,
            as: 'category_product',
          },
          {
            model: Product_Images,
            as: 'product_images',
          },
          {
            model: User,
            as: 'seller',
            attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
          },
        ],
        distinct: true,
      };
      Product.findAndCountAll(query)
        .then((products) => {
          if (page > Math.ceil(products.count / limit)) {
            return res.status(404).json({
              message: 'The page you are looking for does not exist',
            });
          } else {
            return res.status(200).json({
              message: 'success',
              products,
              current_page: page ? page : 1,
              total_pages: limit ? Math.ceil(products.count / limit) : 1,
              total_items: products.rows.length,
            });
          }
        })
        .catch((err) => {
          return res.status(500).json({
            message: 'error',
            error: err.message,
          });
        });
    }
  } else {
    const query = {
      offset: (page - 1) * limit || 0,
      limit: parseInt(limit, 10) || 10,
      where: {
        status: 'unsold',
      },
      include: [
        {
          model: Category,
          as: 'category_product',
        },
        {
          model: Product_Images,
          as: 'product_images',
        },
        {
          model: User,
          as: 'seller',
          attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
        },
      ],
      distinct: true,
    };
    Product.findAndCountAll(query)
      .then((products) => {
        if (page > Math.ceil(products.count / limit)) {
          return res.status(404).json({
            message: 'The page you are looking for does not exist',
          });
        } else {
          return res.status(200).json({
            message: 'success',
            products,
            current_page: page ? page : 1,
            total_pages: limit ? Math.ceil(products.count / limit) : 1,
            total_items: products.rows.length,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  }
};

exports.getAllByCategory = async (req, res, next) => {
  const { slug } = req.params;
  const { page, limit } = req.query;
  const getCategory = await Category.findOne({
    where: {
      slug,
    },
  });
  if (getCategory) {
    Product.findAndCountAll({
      offset: (page - 1) * limit || 0,
      limit: parseInt(limit, 10) || 10,
      where: {
        category_id: getCategory.id,
        status: 'unsold',
      },
      include: [
        {
          model: Category,
          as: 'category_product',
        },
        {
          model: Product_Images,
          as: 'product_images',
        },
      ],
      distinct: true,
    })
      .then((products) => {
        if (page > Math.ceil(products.count / limit)) {
          return res.status(404).json({
            message: 'The page you are looking for does not exist',
          });
        } else {
          return res.status(200).json({
            message: 'success',
            products,
            current_page: page ? page : 1,
            total_pages: limit ? Math.ceil(products.count / limit) : 1,
            total_items: products.rows.length,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  } else {
    return res.status(404).json({
      message: 'The category you are looking for does not exist',
    });
  }
};

exports.getAllBySeller = async (req, res, next) => {
  const { id } = req.params;
  const { page, limit } = req.query;
  if (id) {
    Product.findAndCountAll({
      offset: (page - 1) * limit || 0,
      limit: parseInt(limit, 10) || 10,
      where: {
        user_id: id,
      },
      include: [
        {
          model: Category,
          as: 'category_product',
        },
        {
          model: Product_Images,
          as: 'product_images',
        },
        {
          model: User,
          as: 'seller',
          attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
        },
      ],
      distinct: true,
    })
      .then((products) => {
        if (page > Math.ceil(products.count / limit)) {
          return res.status(404).json({
            message: 'The page you are looking for does not exist',
          });
        } else {
          return res.status(200).json({
            message: 'success',
            products,
            current_page: page ? page : 1,
            total_pages: limit ? Math.ceil(products.count / limit) : 1,
            total_items: products.rows.length,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  } else {
    return res.status(404).json({
      message: 'The seller you are looking for does not exist',
    });
  }
};

exports.getProductDetailBySlugWithoutAuth = (req, res, next) => {
  const slug = req.params.slug;
  Product.findOne({
    where: {
      slug,
    },
    include: [
      {
        model: Product_Images,
        as: 'product_images',
      },
      {
        model: Category,
        as: 'category_product',
      },
      {
        model: User,
        as: 'seller',
        attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    distinct: true,
  })
    .then((product) => {
      if (product) {
        return res.status(200).json({
          message: 'success',
          product,
        });
      } else {
        return res.status(404).json({
          message: 'No product found',
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

exports.getProductDetailBySlugWithAuth = (req, res, next) => {
  const slug = req.params.slug;
  Product.findOne({
    where: {
      slug,
    },
    include: [
      {
        model: Product_Images,
        as: 'product_images',
      },
      {
        model: Category,
        as: 'category_product',
      },
      {
        model: User,
        as: 'seller',
        attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'profile_picture_path', 'phone_number'],
      },
    ],
    distinct: true,
  })
    .then((product) => {
      if (product) {
        Notification.update(
          {
            is_read: true,
          },
          {
            where: {
              product_id: product.id,
              user_id: req.userLoggedin.userId,
              action_message: 'Berhasil diterbitkan',
            },
          }
        );
        Notification.update(
          {
            is_read: true,
          },
          {
            where: {
              product_id: product.id,
              user_id: req.userLoggedin.userId,
              bargain_price: {
                [Op.ne]: null,
              },
              action_message: 'Penawaran Produk',
            },
          }
        );
        return res.status(200).json({
          message: 'success',
          product,
        });
      } else {
        return res.status(404).json({
          message: 'No product found',
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

exports.createProducts = async (req, res, next) => {
  const { product_name, product_desc, product_price, category_id } = req.body;
  const userId = req.userLoggedin.userId;
  const countUnsoldSellerProductPost = await Product.count({
    where: {
      user_id: req.userLoggedin.userId,
      status: 'unsold',
    },
  });
  if (!product_name || !product_desc || !product_price) {
    return res.status(400).json({
      message: 'Please fill all required fields',
    });
  } else {
    if (req.files.length === 0) {
      return res.status(400).json({
        message: 'Please upload at least one image',
      });
    } else {
      if (req.files.length >= 4) {
        req.files.map((file) => {
          cloudinary.uploader.destroy(`${file.filename}`, function (result) {
            console.log(result);
          });
        });
        return res.status(400).json({
          message: 'You can only upload up to 4 images',
        });
      } else {
        if (countUnsoldSellerProductPost >= 3) {
          req.files.map((file) => {
            cloudinary.uploader.destroy(`${file.filename}`, function (result) {
              console.log(result);
            });
          });
          return res.status(400).json({
            message: 'You can only sell 4 products',
          });
        } else {
          await Product.create({
            product_name,
            product_desc,
            product_price,
            user_id: req.userLoggedin.userId,
            status: 'unsold',
            slug: product_name.trim().replace(/\s+/g, '-').toLowerCase(),
            category_id,
          })
            .then((product) => {
              req.files.map((file) => {
                Product_Images.create({
                  product_images_name: file.filename.replace('public/images/products/', ''),
                  product_images_path: file.path,
                  product_id: product.id,
                });
              });
              Notification.create({
                product_id: product.id,
                bargain_price: null,
                user_id: userId,
                action_message: 'Berhasil diterbitkan',
                additional_info_1: null,
                additional_info_2: null,
                is_read: false,
                url: '/detail/' + product.slug,
              });
              return res.status(201).json({
                message: 'success',
                product,
                product_images: req.files,
              });
            })
            .catch((err) => {
              return res.status(500).json({
                message: 'error',
                error: err.message,
              });
            });
        }
      }
    }
  }
};

exports.updateProducts = async (req, res, next) => {
  const { product_name, product_desc, product_price } = req.body;
  const slug = req.params.slug;
  const getProduct = await Product.findOne({
    where: {
      slug,
    },
  });
  if (!getProduct) {
    return res.status(404).json({
      message: 'Product not found',
    });
  } else {
    const getDataProductImage = await Product_Images.findAll({
      where: {
        product_id: getProduct.id,
      },
    });
    await Product.update(
      {
        product_name,
        product_desc,
        product_price,
        slug: product_name ? product_name.trim().replace(/\s+/g, '-').toLowerCase() : slug,
      },
      {
        where: {
          slug,
        },
      }
    )
      .then((product) => {
        if (req.files.length === 0) {
          return res.status(200).json({
            message: 'success',
            product,
          });
        } else {
          getDataProductImage.forEach((data, index) => {
            cloudinary.uploader.destroy(`public/images/products/${data.product_images_name}`, function (result) {
              console.log(result);
            });
          });
          Product_Images.destroy({
            where: {
              product_id: getProduct.id,
            },
          });
          req.files.map((file) => {
            Product_Images.create({
              product_images_name: file.filename,
              product_images_path: file.path,
              product_id: getProduct.id,
            });
          });
          return res.status(200).json({
            message: 'success',
            product,
            product_images: req.files,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const slug = req.params.slug;
  const getDataProduct = await Product.findOne({
    where: {
      slug,
    },
  });
  if (getDataProduct) {
    const getDataProductImage = await Product_Images.findAll({
      where: {
        product_id: getDataProduct.id,
      },
    });
    getDataProductImage.forEach((data, index) => {
      cloudinary.uploader.destroy(`public/images/products/${data.product_images_name}`, function (result) {
        console.log(result);
      });
    });
  }
  await Product.destroy({
    where: {
      slug,
    },
  })
    .then((product) => {
      if (product) {
        return res.status(200).json({
          message: 'success',
          product,
        });
      } else {
        return res.status(404).json({
          message: 'No product found',
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

exports.deleteProductImages = async (req, res, next) => {
  const { product_images_name } = req.params;
  cloudinary.uploader.destroy(`public/images/products/${product_images_name}`, function (result) {
    console.log(result);
  });
  await Product_Images.destroy({
    where: {
      product_images_name,
    },
  })
    .then((product_images) => {
      return res.status(200).json({
        message: 'success',
        product_images,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};
