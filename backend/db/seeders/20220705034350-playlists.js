'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: "Riri's playlist NO.1",
        userId: 3,
        previewImage: '1111111111.jpg',

      },
      {
        name: "Riri's playlist NO.2",
        userId: 3,
        previewImage: '222222222.jpg',

      },
      {
        name: 'iHeartRadio',
        userId: 2,
        previewImage: '3333333333.jpg',

      },
      {
        name: 'iHeartRadio2',
        userId: 2,
        previewImage: '444444444.jpg',

      },
      {
        name: 'Z100-1',
        userId: 1,
        previewImage: '55555555.jpg',

      },
      {
        name: 'Z100-2',
        userId: 1,
        previewImage: '66666666.jpg',

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
