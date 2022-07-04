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
      // define association here
      Song.hasMany(models.Comment, { foreignKey: 'songId', onDelete: 'CASCADE', hooks: true });
      Song.belongsTo(models.Album, { foreignKey: 'albumId' });
      Song.belongsToMany(models.User, { through: models.artistSong })
    }
  }
  Song.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2, 60]
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
