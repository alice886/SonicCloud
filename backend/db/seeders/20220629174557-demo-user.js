'use strict';
const bcrypt = require("bcryptjs");

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
    await queryInterface.bulkInsert('Users', [
      {
        username: 'kermit',
        email: 'kermit@user.io',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        username: 'cookieMonster',
        email: 'cookiemonster@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'elmo',
        email: 'elmo@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['kermit', 'cookieMonster', 'elmo']
      }
    })
  }
};
