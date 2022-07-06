/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class discount_product_offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, { foreignKey: 'product_id', as: 'product_offered' });
      this.belongsTo(models.user, { foreignKey: 'user_id', as: 'bidder' });
      this.belongsTo(models.user, { foreignKey: 'seller_id', as: 'seller_product_offer' });
    }
  }
  discount_product_offer.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      seller_id: DataTypes.INTEGER,
      bargain_price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'discount_product_offer',
    }
  );
  return discount_product_offer;
};
