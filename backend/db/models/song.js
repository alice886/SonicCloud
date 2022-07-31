'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.hasMany(models.Comment, { foreignKey: 'songId', hooks: true, onDelete: 'CASCADE' });
      Song.belongsTo(models.Album, { foreignKey: 'albumId', onDelete: 'CASCADE' });
      Song.belongsTo(models.User, { foreignKey: 'userId', as: 'Artist', onDelete: 'CASCADE' });
      Song.belongsToMany(models.Playlist, { through: models.playlistSong, foreignKey: 'songId', otherKey: 'playlistId', onDelete: 'CASCADE' });
    }
  }
  Song.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2, 60]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
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
    modelName: 'Song',
  });
  return Song;
};
