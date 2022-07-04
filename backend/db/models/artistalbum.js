'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artistAlbum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  artistAlbum.init({
    artistId: DataTypes.INTEGER,
    AlbumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'artistAlbum',
  });
  return artistAlbum;
};