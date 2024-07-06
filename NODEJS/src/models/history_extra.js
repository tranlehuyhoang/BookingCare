"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class History_Extra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History_Extra.init(
    {
      history_id: DataTypes.INTEGER,
      drugs: DataTypes.TEXT,
      description_usage: DataTypes.STRING,
      unit: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "History_Extra",
    }
  );
  return History_Extra;
};
