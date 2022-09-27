'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Albums', [
      {
        name: 'Coffee at 5a.m.',
        userId: 1,
        previewImage: 'https://image.winudf.com/v2/image1/eHRrc3BuLmxvZmlfaWNvbl8xNTU0OTg4MTY0XzA4MQ/icon.png?w=&fakeurl=1',
      },
      {
        name: 'Relax Vinyl',
        userId: 2,
        previewImage: 'https://www.furnacemfg.com/wp-content/uploads/2018/12/transp_yellow_vinyl.jpg',
      },
      {
        name: 'Lofi Chill Mix',
        userId: 3,
        previewImage: 'https://images.news18.com/ibnlive/uploads/2016/10/coffee-feautred-1.jpg',
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
