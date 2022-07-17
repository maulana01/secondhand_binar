/** @format */

'use strict';
const bcrypt = require('bcryptjs');
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
          password: await bcrypt.hash('inipassword', 12),
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
          password: await bcrypt.hash('inipassword', 12),
          name: 'Rara Arara',
          address: 'Gg Mawar 5 Dsn 5 Galang Suka',
          profile_picture: '',
          slug: 'Rara Arara'.trim().replace(/\s+/g, '-').toLowerCase(),
          phone_number: '081360122285',
          city_id: '93',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   email: 'jae@gmail.com',
        //   password: await bcrypt.hash('jae123', 12),
        //   name: 'Jae',
        //   address: 'Samping warung bang dani',
        //   profile_picture: '',
        //   slug: 'Jae'.trim().replace(/\s+/g, '-').toLowerCase(),
        //   phone_number: '6285603216298',
        //   city_id: '1',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: 'silvianaim68@gmail.com',
        //   password: await bcrypt.hash('silvia123', 12),
        //   name: 'Silvia Naim',
        //   address: 'Pesawaran, Lampung',
        //   profile_picture: '',
        //   slug: 'Silvia Naim'.trim().replace(/\s+/g, '-').toLowerCase(),
        //   phone_number: '62895362517392',
        //   city_id: '57',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   email: 'muhamaddr@upnvj.ac.id',
        //   password: await bcrypt.hash('muanra123', 12),
        //   name: 'Muhammad Dian Rahendra',
        //   address: 'Jalan edelweiss 7 blok E8, karangsatria',
        //   profile_picture: '',
        //   slug: 'Muhammad Dian Rahendra'.trim().replace(/\s+/g, '-').toLowerCase(),
        //   phone_number: '6285711097085',
        //   city_id: '8',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
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
