'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, { foreignKey: 'userId' });
      Playlist.belongsToMany(models.Song, { through: models.playlistSong });
    }
  }
  Playlist.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
