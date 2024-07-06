"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("restore_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      roleId: {
        type: Sequelize.STRING,
      },
      phonenumber: {
        type: Sequelize.STRING,
      },
      positionId: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      tokenUser: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      totalCost: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      totalRevenue: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("restore_users");
  },
};
