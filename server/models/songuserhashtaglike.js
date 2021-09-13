'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class songuserhashtaglike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      songuserhashtaglike.belongsTo(models.user, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
      });
      songuserhashtaglike.belongsTo(models.song, {
        onDelete: 'CASCADE',
        foreignKey: 'songId',
      });
      songuserhashtaglike.belongsTo(models.hashtaglike, {
        onDelete: 'CASCADE',
        foreignKey: 'hashtagId',
      });
    }
  };
  songuserhashtaglike.init({
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER,
    hashtagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'songuserhashtaglike',
  });
  return songuserhashtaglike;
};