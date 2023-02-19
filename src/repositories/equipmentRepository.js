const { Equipments, Messages } = require('../models');

/**
 * Repository for accessing and manipulating Equipment data.
 */
class EquipmentRepository {
  /**
   * Retrieves the number of devices turned on and off.
   *
   * @returns {Promise<object>} A promise that resolves with an object containing the FAQs and metadata.
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
