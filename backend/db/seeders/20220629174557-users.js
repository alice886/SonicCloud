'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        username: 'kermit',
        firstName: 'ker',
        lastName: 'mit',
        email: 'kermit@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        isAnArtist: true,
        previewImage: 'https://www.tbstat.com/wp/uploads/2021/06/jay-z.png'
      },
      {
        username: 'cookiemonster',
        firstName: 'cookie',
        lastName: 'monster',
        email: 'cookiemonster@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        isAnArtist: false,
        previewImage: 'https://media-exp1.licdn.com/dms/image/C4D03AQFvzZJ7kUFu4w/profile-displayphoto-shrink_200_200/0/1612364507004?e=1659571200&v=beta&t=vZ3CQu-EZNWbO5QL7yyjv1t2uoEPzvptYos2Q3Ukebk'
      },
      {
        username: 'alice',
        firstName: 'alice',
        lastName: 'li',
        email: 'alice@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        isAnArtist: true,
        previewImage: 'https://ih1.redbubble.net/image.990479598.6272/pp,504x498-pad,600x600,f8f8f8.jpg'
      },
      {
        username: 'dd',
        firstName: 'lucas',
        lastName: 'remi',
        email: 'dd@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        isAnArtist: true,
        previewImage: 'https://a4-images.myspacecdn.com/images04/4/7e561aaecea44b2d93489487d645d680/300x300.jpg'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }

};
