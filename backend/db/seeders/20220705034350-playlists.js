'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: 'playlist NO.1',
        userId: 2,
        previewImage: '1111111111',

      },
      {
        name: 'playlist NO.2',
        userId: 2,
        previewImage: '222222222',

      },
      {
        name: 'iHeartRadio',
        userId: 3,
        previewImage: '3333333333',

      },
      {
        name: 'iHeartRadio2',
        userId: 3,
        previewImage: '444444444',

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
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
