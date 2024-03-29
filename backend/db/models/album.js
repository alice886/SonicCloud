'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    static associate(models) {
      Album.belongsTo(models.User, { foreignKey: 'userId', as: 'Artist', onDelete: 'CASCADE' });
      Album.hasMany(models.Song, { foreignKey: 'albumId', onDelete: 'CASCADE', hooks: true });

    }
  }
  Album.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    defaultScope: {
      attributes: {
        // exclude: ['createdAt', 'updatedAt']
      }
    },
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
