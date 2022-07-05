'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: 'playlist NO.1',
        userId: 2,
        previewImage: '1111111111',
        songId: 3
      },
      {
        name: 'playlist NO.1',
        userId: 2,
        previewImage: '222222222',
        songId: 2
      },
      {
        name: 'iHeartRadio',
        userId: 3,
        previewImage: '3333333333',
        songId: 4
      },
      {
        name: 'iHeartRadio',
        userId: 3,
        previewImage: '444444444',
        songId: 4
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
  }
};
