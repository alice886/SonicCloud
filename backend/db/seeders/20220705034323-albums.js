'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Albums', [
      {
        name: 'Coffee at 5a.m.',
        userId: 1,
        previewImage: 'https://cdn.shopify.com/s/files/1/0502/9517/7415/files/Danes-specialty-coffee-espresso_1024x1024.jpg?v=1613762762',
      },
      {
        name: 'Relax Vinyl',
        userId: 2,
        previewImage: 'https://www.furnacemfg.com/wp-content/uploads/2018/12/transp_yellow_vinyl.jpg',
      },
      {
        name: 'Lofi Chill Mix',
        userId: 3,
        previewImage: 'https://image.winudf.com/v2/image1/eHRrc3BuLmxvZmlfaWNvbl8xNTU0OTg4MTY0XzA4MQ/icon.png?w=&fakeurl=1',
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
