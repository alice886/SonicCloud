'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Albums', [
      {
        name: 'The Hits Collection, Volume One',
        userId: 1,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/TheHitsVol1Cover.jpg/220px-TheHitsVol1Cover.jpg',
      },
      {
        name: 'Good Girl Gone Bad',
        userId: 3,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Good_Girl_Gone_Bad.png',
      },
      {
        name: 'As I Am',
        userId: 4,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Alicia_Keys_-_As_I_Am.png',
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
