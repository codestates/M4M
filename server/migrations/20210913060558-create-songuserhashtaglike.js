'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songuserhashtaglikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'userId',
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      songId: {
        type: Sequelize.INTEGER,
        field: 'songId',
        references: {
          model: 'songs',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      hashtagId: {
        type: Sequelize.INTEGER,
        field: 'hashtagId',
        references: {
          model: 'hashtaglikes',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songuserhashtaglikes');
  }
};
