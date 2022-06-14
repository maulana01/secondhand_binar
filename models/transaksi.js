'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user, { foreignKey: 'user_id', as:"user"});
      this.hasMany(models.produk, { foreignKey: 'product_id', as:"produk"});
    }
  }
  order_transaction.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_quantity: DataTypes.INTEGER,
    total_payment: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order_transaction',
  });
  return order_transaction;
};