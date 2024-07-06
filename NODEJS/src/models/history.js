"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "doctorDataHistory",
      });
    }
  }
  History.init(
    {
      patientId: DataTypes.INTEGER,
      doctorId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      files: DataTypes.BLOB,
      drugs: DataTypes.TEXT,
      reason: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "History",
    }
  );
  return History;
};
