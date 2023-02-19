'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Equipments, { foreignKey: 'equipment_id' });
    }
  }
  Messages.init(
    {
      tag: DataTypes.ENUM('poweron', 'poweroff', 'timebased'),
      value: DataTypes.STRING,
      timestamp: DataTypes.DATE,
      equipment_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Messages',
    }
  );
  return Messages;
};
