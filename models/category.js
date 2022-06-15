/** @format */

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.product, {
        foreignKey: 'category_id',
        as: 'category_product',
      });
    }
  }
  category.init(
    {
      category_name: DataTypes.STRING,
      category_desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'category',
    }
  );
  return category;
};
