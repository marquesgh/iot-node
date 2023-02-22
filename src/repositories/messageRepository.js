const { Messages, Equipments } = require('../models');

/**
 * Repository for accessing and manipulating Message data.
 */
class MessageRepository {
  /**
   * Retrieves all Messages in a paginated format.
   *
   * @param {string} tag - The message tag.
   * @param {string} equipment_id - The id of the equipment.
   * @param {string} value - The message value.
   * @param {string} timestamp - The message timestamp.
   * @returns {Promise<object>} A promise that resolves with an object containing the FAQs and metadata.
   */
  static async store({ tag, equipment_id, value, timestamp }) {
    return Messages.create({ tag, equipment_id, value, timestamp });
  }

  /**
   * Retrieves all messages in a paginated format.
   *
   * @param {number} limit - The maximum number of messages to retrieve.
   * @param {number} offset - The number of messages to skip before starting to retrieve.
   * @returns {Promise<object>} A promise that resolves with an object containing the messages and metadata.
   */
  static findAll({ limit, offset }) {
    return Messages.findAndCountAll({
      limit,
      offset,
      include: {
        model: Equipments,
        attributes: ['imei'],
      },
    });
  }
}

module.exports = MessageRepository;
