'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      const { id, username, email } = this;
      return { id, username, email };
    };
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    };
    static async login({ credential, password }) {
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      // define association here
      User.hasMany(models.Playlist, { foreignKey: 'userId', hooks: true });
      User.belongsToMany(models.Song, { through: models.artistSong });
      User.belongsToMany(models.Album, { through: models.artistAlbum });
      // User.belongsToMany(models.Comment, { foreignKey: 'userId' , onDelete:'CASCADE',hooks:true});

    };
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
        isNotAnEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Unsername cannot be an email!');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 300],
        isAnEmail(value) {
          if (!Validator.isEmail(value)) {
            throw new Error("Plz enter an email");
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }

  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
