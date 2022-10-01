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
        userId: 3,
        songId: 1,
        body: 'we should collab again'
      },
      {
        userId: 3,
        songId: 2,
        body: 'love your work!'
      },
      {
        userId: 3,
        songId: 3,
        body: 'all time fav, 10/10'
      },
      {
        userId: 3,
        songId: 4,
        body: 'WOW, just WOW'
      },
      {
        userId: 3,
        songId: 1,
        body: 'my jam!'
      },
      {
        userId: 1,
        songId: 6,
        body: 'my jam so good!'
      },
      {
        userId: 1,
        songId: 7,
        body: 'great study music!'
      },
      {
        userId: 1,
        songId: 8,
        body: 'need more'
      },
      {
        userId: 1,
        songId: 9,
        body: 'catchy <3'
      },
      {
        userId: 1,
        songId: 10,
        body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        userId: 1,
        songId: 11,
        body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        userId: 1,
        songId: 12,
        body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        userId: 1,
        songId: 14,
        body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
