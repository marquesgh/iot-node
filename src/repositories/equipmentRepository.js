const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { Equipments, Messages } = require('../models');

/**
 * Repository for accessing and manipulating Equipment data.
 */
class EquipmentRepository {
  /**
   * Retrieves active equipment.
   *
   * @param {number} limit - The maximum number of equipments to retrieve.
   * @param {number} offset - The number of equipments to skip before starting to retrieve.
   * @returns {Promise<object>} A promise that resolves with an object containing the equipments and metadata.
   */
  static async getActive({ limit, offset }) {
    const currentTime = new Date();
    const last30MinutesTime = new Date(currentTime.getTime() - 30 * 60000); // 30 minutes ago
    return Equipments.findAndCountAll({
      limit,
      offset,
      attributes: ['imei', 'description'],
      include: [
        {
          model: Messages,
          attributes: [],
          where: {
            timestamp: {
              [Op.gt]: last30MinutesTime,
            },
          },
          raw: true,
        },
      ],
    });
  }

  /**
   * Retrieves the status of inactive equipments.
   *
   * @returns {Promise<object>} A promise that resolves with an object containing the equipments status and metadata.
   */
  static async getStatus({ limit, offset }) {
    const currentTime = new Date();
    const last30MinutesTime = new Date(currentTime.getTime() - 30 * 60000); // 30 minutes ago
    const { count, rows } = await Equipments.findAndCountAll({
      limit,
      offset,
      attributes: ['imei'],
      include: [
        {
          model: Messages,
          attributes: ['timestamp'],
          where: {
            timestamp: {
              [Op.lt]: last30MinutesTime,
            },
          },
          raw: true,
        },
      ],
    });
    const toReturn = await rows.map((equipment) => {
      const messageTimestamp = new Date(equipment.Messages[0].timestamp);
      const diffHours = Math.abs(currentTime.getTime() - messageTimestamp.getTime()) / 3600000;
      const status = diffHours <= 24 ? 'warning' : 'critical';
      return { imei: equipment.imei, status: status };
    });
    return { count, toReturn };
  }

  /**
   * Retrieves the number of devices turned on and off.
   *
   * @returns {Promise<object>} A promise that resolves with an object containing the equipments and metadata.
   */
  static async getSituation() {
    const equipments = await Equipments.findAll();
    var offEquipments = 0;

    for (const equipment of equipments) {
      const message = await Messages.findOne({
        attributes: ['tag'],
        order: [['timestamp', 'DESC']],
        limit: 1,
        where: { equipment_id: equipment.id },
        raw: true,
      });
      if (message) {
        if (message.tag == 'poweroff') {
          offEquipments += 1;
        }
      } else {
        offEquipments += 1;
      }
    }
    const all = await Equipments.count();
    const result = {
      on: all - offEquipments,
      off: offEquipments,
    };

    return result;
  }
}

module.exports = EquipmentRepository;
