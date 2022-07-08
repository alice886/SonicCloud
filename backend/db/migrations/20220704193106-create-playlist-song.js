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
        references: {
          model: 'Songs'
        },
        onDelete: 'cascade'

      },
      playlistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Playlists'
        },
        onDelete: 'cascade'
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
    // await queryInterface.addIndex(
    //   'playlistSongs',
    //   ['songId', 'playlistId'],
    //   {
    //     unique: true
    //   }
    // );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playlistSongs');
  }
};
