'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user, { foreignKey: "user_id" , as:"user"});
      this.hasMany(models.category, { foreignKey: "category_id", as:"category"});
      this.belongsTo(models.transaksi, {foreignKey: "product_id" , as: "transaksi"})
      this.belongsTo(models.bargainPrice, {foreignKey: "product_id" , as: "bargainPrice"})
      this.hasMany(models.wishlist, {foreignKey: "product_id", as: "wishlist"})
    }
  }
  product.init({
    product_name: DataTypes.STRING,
    product_desc: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    product_images: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};