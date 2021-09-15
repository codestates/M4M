'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      user.hasMany(models.comment, {
        foreignKey: 'userId'
      });
      user.hasMany(models.songuserhashtaglike, {
        foreignKey: 'userId'
      });
      // user.belongsTo(models.songuserhashtaglike, {
      //   onDelete: 'CASCADE',
      //   foreignKey: 'userId',
      // });
    }
  }
  user.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    salt: DataTypes.TEXT,
    password: DataTypes.TEXT,
    birthYear: DataTypes.INTEGER,
    kakao: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user'
  });
  return user;
};
