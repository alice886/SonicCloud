'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('playlistSongs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      songId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Song' }
      },
      playlistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Playlist' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playlistSongs');
  }
};
