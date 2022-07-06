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
  const query = filter
    ? {
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
            attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'phone_number'],
          },
        ],
        distinct: true,
      }
    : {
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
            attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'phone_number'],
          },
        ],
        distinct: true,
      };
  Product.findAndCountAll(query)
    .then((products) => {
      if (page > Math.ceil(products.count / limit)) {
        res.status(404).json({
          message: 'The page you are looking for does not exist',
        });
      } else {
        res.status(200).json({
          message: 'success',
          products,
          current_page: page,
          total_pages: limit ? Math.ceil(products.count / limit) : 1,
          total_items: products.rows.length,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
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
          res.status(404).json({
            message: 'The page you are looking for does not exist',
          });
        } else {
          res.status(200).json({
            message: 'success',
            products,
            current_page: page,
            total_pages: limit ? Math.ceil(products.count / limit) : 1,
            total_items: products.rows.length,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  } else {
    res.status(404).json({
      message: 'The category you are looking for does not exist',
    });
  }
};

exports.getAllBySeller = async (req, res, next) => {
  const { slug } = req.params;
  const { page, limit } = req.query;
  const getUser = await User.findOne({
    where: {
      slug: slug,
    },
  });
  if (getUser) {
    Product.findAndCountAll({
      offset: (page - 1) * limit || 0,
      limit: parseInt(limit, 10) || 10,
      where: {
        user_id: getUser.id,
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
          attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'phone_number'],
        },
      ],
      distinct: true,
    })
      .then((products) => {
        if (page > Math.ceil(products.count / limit)) {
          res.status(404).json({
            message: 'The page you are looking for does not exist',
          });
        } else {
          res.status(200).json({
            message: 'success',
            products,
            current_page: page,
            total_pages: limit ? Math.ceil(products.count / limit) : 1,
            total_items: products.rows.length,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: 'error',
          error: err.message,
        });
      });
  } else {
    res.status(404).json({
      message: 'The seller you are looking for does not exist',
    });
  }
};

exports.getProductDetailBySlug = (req, res, next) => {
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
        attributes: ['email', 'name', 'slug', 'address', 'profile_picture', 'phone_number'],
      },
    ],
    distinct: true,
  })
    .then((product) => {
      if (product) {
        res.status(200).json({
          message: 'success',
          product,
        });
      } else {
        res.status(404).json({
          message: 'No product found',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.createProducts = async (req, res, next) => {
  const { product_name, product_desc, product_price, category_id } = req.body;
  const userId = req.userLoggedin.userId;
  // console.log('TEST CONSOLE.LOG NIH');
  const countUnsoldSellerProductPost = await Product.count({
    where: {
      user_id: req.userLoggedin.userId,
      status: 'unsold',
    },
  });
  // const unsoldSellerProduct = await Transaction.findAll({
  //   where: {
  //     user_id: req.userLoggedIn.userId,
  //     status: 'unsold',
  //   }
  // })

  if (!product_name || !product_desc || !product_price) {
    res.status(400).json({
      message: 'Please fill all required fields',
    });
  } else {
    // if (countUnsoldSellerProductPost > 4) {
    //   res.status(400).json({
    //     message: 'You can only sell 4 products',
    //   });
    //   req.files.map((file) => {
    //     const _path = path.join(__dirname, '../public/images/products/', file.filename);
    //     fs.unlink(_path, (err) => {
    //       if (err) console.log(err);
    //     });
    //   });
    // } else {
    if (req.files.length === 0) {
      res.status(400).json({
        message: 'Please upload at least one image',
      });
    } else {
      if (req.files.length > 4) {
        res.status(400).json({
          message: 'You can only upload up to 4 images',
        });
        req.files.map((file) => {
          // const _path = path.join(__dirname, '../public/images/products/', file.filename);
          // fs.unlink(_path, (err) => {
          //   if (err) console.log(err);
          // });
          cloudinary.uploader.destroy(`${file.filename}`, function (result) {
            console.log(result);
          });
        });
      } else {
        console.log('ini total product', countUnsoldSellerProductPost);
        if (countUnsoldSellerProductPost >= 4) {
          res.status(400).json({
            message: 'You can only sell 4 products',
          });
          req.files.map((file) => {
            // const _path = path.join(__dirname, '../public/images/products/', file.filename);
            // fs.unlink(_path, (err) => {
            //   if (err) console.log(err);
            // });
            cloudinary.uploader.destroy(`${file.filename}`, function (result) {
              console.log(result);
            });
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
                // console.log('ini cloudinary', file.filename.replace('public/images/products/', ''));
                Product_Images.create({
                  product_images_name: file.filename.replace('public/images/products/', ''),
                  product_images_path: file.path,
                  product_id: product.id,
                });
              });
              // console.log({ product });
              Notification.create({
                product_id: product.id,
                bargain_price: null,
                user_id: userId,
                action_message: 'Produk berhasil ditambahkan',
              });
              res.status(201).json({
                message: 'success',
                product,
                product_images: req.files,
              });
            })
            .catch((err) => {
              res.status(500).json({
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
  // const total_product_images = await Product_Images.count({
  //   where: {
  //     product_id: getProduct.id,
  //   },
  // });
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
        res.status(200).json({
          message: 'success',
          product,
        });
      } else {
        // if (total_product_images + req.files.length > 4) {
        //   res.status(400).json({
        //     message: 'You can only upload a maximum of 4 images',
        //   });
        //   req.files.map((file) => {
        //     // const _path = path.join(__dirname, '../public/images/products/', file.filename);
        //     // fs.unlink(_path, (err) => {
        //     //   if (err) console.log(err);
        //     // });
        //     cloudinary.uploader.destroy(`${file.filename}`, function (result) {
        //       console.log(result);
        //     });
        //   });
        // } else {
        const getDataProductImage = Product_Images.findAll({
          where: {
            product_id: getProduct.id,
          },
        });
        getDataProductImage.forEach((data, index) => {
          cloudinary.uploader.destroy(`public/images/products/${data.product_images_name}`, function (result) {
            console.log(result);
          });
        });
        req.files.map((file) => {
          Product_Images.create({
            product_images_name: file.filename,
            product_images_path: file.path,
            product_id: getProduct.id,
          });
        });
        res.status(200).json({
          message: 'success',
          product,
          product_images: req.files,
        });
        // }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.updateSoldProduct = async (req, res, next) => {
  const { product_name, product_desc, product_price } = req.body;
  const id = req.params.id;
  const getDiscProduct = await DiscProduct.findOne({
    where: {
      product_id: id,
    },
  });
  await Product.update(
    {
      status: 'sold',
    },
    {
      where: {
        id,
      },
    }
  )
    .then((product) => {
      DiscProduct.update(
        {
          status: 'rejected',
        },
        {
          where: {
            product_id: id,
          },
        }
      );
      res.status(200).json({
        message: 'success',
        product,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
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
        res.status(200).json({
          message: 'success',
          product,
        });
      } else {
        res.status(404).json({
          message: 'No product found',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};

exports.deleteProductImages = async (req, res, next) => {
  const { product_images_name } = req.params;
  // const _path = path.join(__dirname, '../public/images/products/', product_images_name);
  // fs.unlink(_path, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('File deleted');
  //   }
  // });
  cloudinary.uploader.destroy(`public/images/products/${product_images_name}`, function (result) {
    console.log(result);
  });
  await Product_Images.destroy({
    where: {
      product_images_name,
    },
  })
    .then((product_images) => {
      res.status(200).json({
        message: 'success',
        product_images,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'error',
        error: err.message,
      });
    });
};
