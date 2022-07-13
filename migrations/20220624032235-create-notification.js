/** @format */

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      bargain_price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      action_message: {
        type: Sequelize.STRING,
      },
      additional_info_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      additional_info_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // is_read: {
      //   type: Sequelize.BOOLEAN,
      //   defaultValue: false,
      //   allowNull: false,
      // },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('notifications');
  },
};
