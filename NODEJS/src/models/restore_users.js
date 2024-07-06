"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class restore_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  restore_users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      image: DataTypes.TEXT,
      roleId: DataTypes.STRING,
      positionId: DataTypes.STRING,
      tokenUser: DataTypes.STRING,
      totalCost: DataTypes.INTEGER,
      totalRevenue: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "restore_users",
    }
  );
  return restore_users;
};
