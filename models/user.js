'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post);
      User.hasMany(models.Art);
      User.hasMany(models.Follower);
      User.hasMany(models.Following);
      User.hasMany(models.Transaction);
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
  });
  return User;
};