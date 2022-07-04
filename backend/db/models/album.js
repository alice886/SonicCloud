'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Album.belongsToMany(models.User, { through: models.artistAlbum });
      Album.hasMany(models.Song, { foreignKey: 'songId' });

    }
  }
  Album.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songId: {
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
        exclude: ['createdAt', 'updatedAt']
      }
    },
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
