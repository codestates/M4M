'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      birthYear: {
        type: Sequelize.INTEGER
      },
      kakao: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};