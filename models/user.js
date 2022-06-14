'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role, { foreignKey: "role_id" , as: "role"});
      this.belongsTo(models.wishlist, {foreignKey: "user_id", as: "wishlist"})
      this.belongsTo(models.bargainProduct, {foreignKey: "user_id", as: "bargainProduct"})
      this.belongsTo(models.produk, {foreignKey: "user_id", as: "produk"})
      this.belongsTo(models.transaksi, {foreignKey: "user_id", as: "transaksi"})
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};