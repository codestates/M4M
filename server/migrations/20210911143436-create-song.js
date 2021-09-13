'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      album: {
        type: Sequelize.STRING
      },
      album_art: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      lyrics: {
        type: Sequelize.TEXT
      },
      recommendType1: {
        type: Sequelize.STRING
      },
      recommendType2: {
        type: Sequelize.STRING
      },
      recommendType3: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songs');
  }
};
