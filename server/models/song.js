'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  song.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    genre: DataTypes.STRING,
    album: DataTypes.STRING,
    album_art: DataTypes.STRING,
    date: DataTypes.STRING,
    year: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    recommendType1: DataTypes.STRING,
    recommendType2: DataTypes.STRING,
    recommendType3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'song'
  });
  return song;
};
