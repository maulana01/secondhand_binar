/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'product_notification',
      });
      this.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user_notification',
      });
    }
  }
  notification.init(
    {
      product_id: DataTypes.INTEGER,
      bargain_price: DataTypes.INTEGER,
      action_message: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'notification',
    }
  );
  return notification;
};
