"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Limit_Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Limit_Bookings.init(
    {
      doctorId: DataTypes.INTEGER,
      timeType: DataTypes.STRING,
      limit: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Limit_Bookings",
    }
  );
  return Limit_Bookings;
};
