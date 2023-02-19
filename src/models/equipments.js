'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Messages);
    }
  }
  Equipments.init(
    {
      imei: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Equipments',
    }
  );
  return Equipments;
};
