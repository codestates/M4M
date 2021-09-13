'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.user, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
      });
      comment.belongsTo(models.song, {
        onDelete: 'CASCADE',
        foreignKey: 'songId',
      });
    }
  };
  comment.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};