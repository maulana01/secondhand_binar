'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('roles', [{
      role_name: 'Seller',
      role_desc: 'Penjual Barang',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
     role_name: 'Buyer',
     role_desc: 'Pembeli barang',
     createdAt: new Date(),
     updatedAt: new Date(),
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
