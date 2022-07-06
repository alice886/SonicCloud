'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, { foreignKey: 'userId' , as: 'Artist' });
      Playlist.belongsToMany(models.Song, { through: models.playlistSong });
    }
  }
  Playlist.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 80],
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
