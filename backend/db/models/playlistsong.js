'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlistSong extends Model {

    static associate(models) {
      // define association here
      playlistSong.belongsTo(models.Playlist, { onDelete: 'CASCADE' });
      playlistSong.belongsTo(models.Song, { onDelete: 'CASCADE' });

    }
  }
  playlistSong.init({
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'playlistSong',
  });
  return playlistSong;
};
