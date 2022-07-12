/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'order_transaction_user',
      });
      this.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'order_transaction_product',
      });
      this.belongsTo(models.user, {
        foreignKey: 'seller_id',
        as: 'order_transaction_seller',
      });
    }
  }
  order_transaction.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      seller_id: DataTypes.INTEGER,
      total_payment: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'order_transaction',
    }
  );
  return order_transaction;
};
