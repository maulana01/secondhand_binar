/** @format */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'categories',
      [
        {
          category_name: 'hobi',
          category_desc: 'Berisi barang-barang yang berkaitan dengan kegemaran atau hobi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'kendaraan',
          category_desc: 'Berisi berbagai macam kendaraan mulai dari sepeda, motor, hingga mobil',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'baju',
          category_desc: 'Berbagai macam baju yang siap memenuhi kebutuhan fashion-mu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'elektronik',
          category_desc: 'Berisi barang-barang elektronik yang berkaitan dengan kebutuhanmu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'kesehatan',
          category_desc: 'Berisi barang-barang kesehatan yang dapat menjaga mu dimanapun',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
