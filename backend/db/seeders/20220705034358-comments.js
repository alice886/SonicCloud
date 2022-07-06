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
    await queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        songId: 2,
        body: 'we should collab again'
      },
      {
        userId: 2,
        songId: 1,
        body: 'love your work Riri!'
      },
      {
        userId: 4,
        songId: 2,
        body: 'all time fav, 10/10'
      },
      {
        userId: 3,
        songId: 3,
        body: 'Confused, Izzo or Lizzo ??'
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
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
