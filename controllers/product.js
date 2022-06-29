/** @format */

const {
  product: Product,
  Sequelize,
  product_images: Product_Images,
  category: Category,
  user: User,
  order_transaction: Transaction,
  notification: Notification,
} = require("../models");
const fs = require("fs");
const path = require("path");
const { Op } = Sequelize;

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
          status: "unsold",
        },
        include: [
          {
            model: Category,
            as: "category_product",
          },
          {
            model: Product_Images,
            as: "product_images",
          },
          {
            model: User,
            as: "product_user",
            attributes: [
              "email",
              "name",
              "slug",
              "address",
              "profile_picture",
              "phone_number",
            ],
          },
        ],
        distinct: true,
      }
    : {
        offset: (page - 1) * limit || 0,
        limit: parseInt(limit, 10) || 10,
        where: {
          status: "unsold",
        },
        include: [
          {
            model: Category,
            as: "category_product",
          },
          {
            model: Product_Images,
            as: "product_images",
          },
          {
            model: User,
            as: "product_user",
            attributes: [
              "email",
              "name",
              "slug",
              "address",
              "profile_picture",
              "phone_number",
            ],
          },
        ],
        distinct: true,
      };
  Product.findAndCountAll(query)
    .then((products) => {
      if (page > Math.ceil(products.count / limit)) {
        res.status(404).json({
          message: "The page you are looking for does not exist",
        });
      } else {
        res.status(200).json({
          message: "success",
          products,
          current_page: page,
          total_pages: limit ? Math.ceil(products.count / limit) : 1,
          total_items: products.rows.length,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "error",
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
        status: "unsold",
      },
      include: [
        {
          model: Category,
          as: "category_product",
        },
        {
          model: Product_Images,
          as: "product_images",
        },
      ],
      distinct: true,
    })
      .then((products) => {
        if (page > Math.ceil(products.count / limit)) {
          res.status(404).json({
            message: "The page you are looking for does not exist",
          });
        } else {
          res.status(200).json({
            message: "success",
            products,
            current_page: page,
            total_pages: limit ? Math.ceil(products.count / limit) : 1,
            total_items: products.rows.length,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "error",
          error: err.message,
        });
      });
  } else {
    res.status(404).json({
      message: "The category you are looking for does not exist",
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
          as: "category_product",
        },
        {
          model: Product_Images,
          as: "product_images",
        },
        {
          model: User,
          as: "product_user",
          attributes: [
            "email",
            "name",
            "slug",
            "address",
            "profile_picture",
            "phone_number",
          ],
        },
      ],
      distinct: true,
    })
      .then((products) => {
        if (page > Math.ceil(products.count / limit)) {
          res.status(404).json({
            message: "The page you are looking for does not exist",
          });
        } else {
          res.status(200).json({
            message: "success",
            products,
            current_page: page,
            total_pages: limit ? Math.ceil(products.count / limit) : 1,
            total_items: products.rows.length,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "error",
          error: err.message,
        });
      });
  } else {
    res.status(404).json({
      message: "The seller you are looking for does not exist",
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
        as: "product_images",
      },
      {
        model: Category,
        as: "category_product",
      },
      {
        model: User,
        as: "product_user",
        attributes: [
          "email",
          "name",
          "slug",
          "address",
          "profile_picture",
          "phone_number",
        ],
      },
    ],
    distinct: true,
  })
    .then((product) => {
      if (product) {
        res.status(200).json({
          message: "success",
          product,
        });
      } else {
        res.status(404).json({
          message: "No product found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "error",
        error: err.message,
      });
    });
};

exports.createProducts = async (req, res, next) => {
  const { product_name, product_desc, product_price, category_id } = req.body;
  const userId = req.userLoggedin.userId;
  console.log("TEST CONSOLE.LOG NIH");
  const countUnsoldSellerProductPost = await Product.count({
    where: {
      user_id: req.userLoggedin.userId,
      status: "unsold",
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
      message: "Please fill all required fields",
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
        message: "Please upload at least one image",
      });
    } else {
      if (req.files.length > 4) {
        res.status(400).json({
          message: "You can only upload up to 4 images",
        });
        req.files.map((file) => {
          const _path = path.join(
            __dirname,
            "../public/images/products/",
            file.filename
          );
          fs.unlink(_path, (err) => {
            if (err) console.log(err);
          });
        });
      } else {
        console.log("ini total product", countUnsoldSellerProductPost);
        if (countUnsoldSellerProductPost >= 4) {
          res.status(400).json({
            message: "You can only sell 4 products",
          });
          req.files.map((file) => {
            const _path = path.join(
              __dirname,
              "../public/images/products/",
              file.filename
            );
            fs.unlink(_path, (err) => {
              if (err) console.log(err);
            });
          });
        } else {
          await Product.create({
            product_name,
            product_desc,
            product_price,
            user_id: req.userLoggedin.userId,
            status: "unsold",
            slug: product_name.trim().replace(/\s+/g, "-").toLowerCase(),
            category_id,
          })
            .then((product) => {
              req.files.map((file) => {
                Product_Images.create({
                  product_images_name: file.filename,
                  product_id: product.id,
                });
              });
              console.log({ product });
              Notification.create({
                product_id: product.id,
                bargain_price: null,
                user_id: userId,
                action_message: "Produk berhasil ditambahkan",
              });
              res.status(201).json({
                message: "success",
                product,
                product_images: req.files,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "error",
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
  const total_product_images = await Product_Images.count({
    where: {
      product_id: getProduct.id,
    },
  });
  await Product.update(
    {
      product_name,
      product_desc,
      product_price,
      slug: product_name
        ? product_name.trim().replace(/\s+/g, "-").toLowerCase()
        : slug,
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
          message: "success",
          product,
        });
      } else {
        if (total_product_images + req.files.length > 4) {
          res.status(400).json({
            message: "You can only upload a maximum of 4 images",
          });
          req.files.map((file) => {
            const _path = path.join(
              __dirname,
              "../public/images/products/",
              file.filename
            );
            fs.unlink(_path, (err) => {
              if (err) console.log(err);
            });
          });
        } else {
          req.files.map((file) => {
            Product_Images.create({
              product_images_name: file.filename,
              product_id: getProduct.id,
            });
          });
          res.status(200).json({
            message: "success",
            product,
            product_images: req.files,
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "error",
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
      const _path = path.join(
        __dirname,
        "../public/images/products/",
        data.product_images_name
      );
      fs.unlink(_path, (err) => {
        if (err) console.log(err);
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
          message: "success",
          product,
        });
      } else {
        res.status(404).json({
          message: "No product found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "error",
        error: err.message,
      });
    });
};

exports.deleteProductImages = async (req, res, next) => {
  const { product_images_name } = req.params;
  const _path = path.join(
    __dirname,
    "../public/images/products/",
    product_images_name
  );
  fs.unlink(_path, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File deleted");
    }
  });
  await Product_Images.destroy({
    where: {
      product_images_name,
    },
  })
    .then((product_images) => {
      res.status(200).json({
        message: "success",
        product_images,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error",
        error: err.message,
      });
    });
};
