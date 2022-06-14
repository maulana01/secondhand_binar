'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.user, { foreignKey: 'role_id', as:"role"});

    }
  }
  role.init({
    role_name: DataTypes.STRING,
    role_desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};