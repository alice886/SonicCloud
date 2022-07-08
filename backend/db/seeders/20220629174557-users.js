'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        username: 'kermitZ',
        firstName: 'Kermit',
        lastName: 'JayZ',
        email: 'kermitz@user.io',
        hashedPassword: bcrypt.hashSync('password1'),
        isAnArtist: true,
        previewImage: 'xxxxxxxx.jpg'
      },
      {
        username: 'CMonster',
        firstName: 'Cookie',
        lastName: 'Monster',
        email: 'c-monster@user.io',
        hashedPassword: bcrypt.hashSync('password2'),
        isAnArtist: false,
        previewImage: 'xxxxxxxx.jpg'
      },
      {
        username: 'Riri',
        firstName: 'Rihanna',
        lastName: 'Fanta',
        email: 'riri@user.io',
        hashedPassword: bcrypt.hashSync('password3'),
        isAnArtist: true,
        previewImage: 'xxxxxxxx.jpg'
      },
      {
        username: 'AKeys',
        firstName: 'Alexa',
        lastName: 'Keys',
        email: 'akeys@user.io',
        hashedPassword: bcrypt.hashSync('password4'),
        isAnArtist: true,
        previewImage: 'xxxxxxxx.jpg'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }

};
