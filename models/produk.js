/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'user_id', as: 'product_user' });
      this.belongsTo(models.category, {
        foreignKey: 'category_id',
        as: 'category_product',
      });
      this.hasMany(models.order_transaction, {
        foreignKey: 'product_id',
        as: 'order_transaction_product',
      });
      this.hasMany(models.bargain_product, {
        foreignKey: 'product_id',
        as: 'bargain_product_producttable',
      });
      this.hasMany(models.wishlist, {
        foreignKey: 'product_id',
        as: 'wishlist_product',
      });
      this.hasMany(models.product_images, {
        foreignKey: 'product_id',
        as: 'product_images',
      });
    }
  }
  product.init(
    {
      product_name: DataTypes.STRING,
      product_desc: DataTypes.STRING,
      product_price: DataTypes.INTEGER,
      slug: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'product',
    }
  );
  return product;
};
