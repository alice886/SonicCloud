'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Albums', [
      {
        name: 'The Hits Collection, Volume One',
        songId: null,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/TheHitsVol1Cover.jpg/220px-TheHitsVol1Cover.jpg',
        artistId: 1,
      },
      {
        name: 'Good Girl Gone Bad',
        songId: null,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Good_Girl_Gone_Bad.png',
        artistId: 3,
      },
      {
        name: 'As I Am',
        songId: null,
        previewImage: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Alicia_Keys_-_As_I_Am.png',
        artistId: 4,
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
