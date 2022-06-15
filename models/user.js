/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role, { foreignKey: 'role_id', as: 'role' });
      this.belongsTo(models.city, {foreignKey: 'city_id', as: 'city_user'});
      this.hasMany(models.wishlist, {
        foreignKey: 'user_id',
        as: 'wishlist_user',
      });
      this.hasMany(models.bargain_product, {
        foreignKey: 'user_id',
        as: 'bargain_product_user',
      });
      this.hasMany(models.product, { foreignKey: 'user_id', as: 'product_user' });
      this.hasMany(models.order_transaction, {
        foreignKey: 'user_id',
        as: 'order_transaction_user',
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      city_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
