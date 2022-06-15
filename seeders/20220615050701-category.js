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

     await queryInterface.bulkInsert(
      'categories',
      [
        {
          category_name: 'Hobi',
          category_desc: 'Berisi barang-barang yang berkaitan dengan kegemaran atau hobi',
          slug: 'hobi',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Kendaraan',
          category_desc: 'Berisi berbagai macam kendaraan mulai dari sepeda, motor, hingga mobil',
          slug: 'kendaraan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Baju',
          category_desc: 'Berbagai macam baju yang siap memenuhi kebutuhan fashion-mu',
          slug: 'baju',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Elektronik',
          category_desc: 'Berisi barang-barang elektronik yang berkaitan dengan kebutuhanmu',
          slug: 'elektronik',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: 'Kesehatan',
          category_desc: 'Berisi barang-barang kesehatan yang dapat menjaga mu dimanapun',
          slug: 'kesehatan',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
