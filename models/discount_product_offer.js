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
      this.belongsTo(models.user, { foreignKey: 'user_id', as: 'discount_product_offer_user' });
      this.belongsTo(models.product, { foreignKey: 'product_id', as: 'discount_product_offer_producttable' });
    }
  }
  discount_product_offer.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      cut_price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'discount_product_offer',
    }
  );
  return discount_product_offer;
};
