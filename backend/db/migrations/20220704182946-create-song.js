'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'User',
        // },
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        // references: {
        //   model: 'Album',
        // },
      },
      title: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      url: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      previewImage: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: 'image url'
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
    await queryInterface.dropTable('Songs');
  }
};
