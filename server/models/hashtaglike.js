'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hashtaglike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      hashtaglike.hasMany(models.songuserhashtaglike, {
        foreignKey: "hashtagId",
      });
    }
  };
  hashtaglike.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hashtaglike',
  });
  return hashtaglike;
};