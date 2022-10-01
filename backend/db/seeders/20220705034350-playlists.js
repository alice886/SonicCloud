'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Playlists', [
      {
        name: "KK's playlist NO.1",
        userId: 1,
        previewImage: 'https://i.pinimg.com/originals/6f/a4/be/6fa4be983556dd85f688d25ba7412184.gif',

      },
      {
        name: "KK's playlist NO.2",
        userId: 2,
        previewImage: 'https://www.fluance.com/media/catalog/product/cache/3/lifestyle_image_mobile/9df78eab33525d08d6e5fb8d27136e95/f/l/fluance-rt80-lifestyle-mobiles.jpg',

      },
      {
        name: 'iHeartRadio1',
        userId: 3,
        previewImage: 'https://www.rollingstone.com/wp-content/uploads/2021/03/Best-Crosley-Record-Player.png',

      },
      {
        name: 'iHeartRadio2',
        userId: 1,
        previewImage: 'https://media.cnn.com/api/v1/images/stellar/prod/210122104552-best-record-players-fluance.jpg?q=w_2278,h_1282,x_0,y_0,c_fill',

      },
      {
        name: 'Z100-1',
        userId: 2,
        previewImage: 'https://media.wired.com/photos/5efa53ef8b1d8604aa69bea1/master/w_2400,h_1800,c_limit/Gear-Rega-Planar-1-SOURCE-Rega.jpg',

      },
      {
        name: 'Z100-2',
        userId: 3,
        previewImage: 'https://www.zdnet.com/a/img/resize/1b49e19eb964e87a4d39d0adc8a30bd573f7ac5d/2022/04/01/1c2ba148-a0d1-4944-bb61-89f0610eefde/best-record-player.jpg?width=1200&height=900&fit=crop&auto=webp',

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
