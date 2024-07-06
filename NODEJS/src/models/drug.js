"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Drug.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Drug",
    }
  );
  return Drug;
};
