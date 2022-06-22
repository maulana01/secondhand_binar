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
      'users',
      [
        {
          email: 'rodiah.akhfani@gmail.com',
          password: 'inipassword',
          name: 'Rodiah Akhfani Nasution',
          address: 'Gg Mawar 3 Dsn 1 Galang Suka',
          profile_picture: '',
          slug: 'Rodiah Akhfani Nasution'.trim().replace(/\s+/g, '-').toLowerCase(),
          phone_number: '085261774320',
          city_id: '93',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'raraarara@gmail.com',
          password: 'inipassword',
          name: 'Rara Arara',
          address: 'Gg Mawar 5 Dsn 5 Galang Suka',
          profile_picture: '',
          slug: 'Rara Arara'.trim().replace(/\s+/g, '-').toLowerCase(),
          phone_number: '081360122285',
          city_id: '93',
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
