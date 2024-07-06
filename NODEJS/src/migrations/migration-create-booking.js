"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      statusId: {
        type: Sequelize.STRING,
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      patientId: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      timeType: {
        type: Sequelize.STRING,
      },
      token: {
        type: Sequelize.STRING,
      },
      imageRemedy: {
        type: Sequelize.BLOB("long"),
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
      patientName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      patientPhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      patientAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      patientReason: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      patientGender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      patientBirthday: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Bookings");
  },
};
