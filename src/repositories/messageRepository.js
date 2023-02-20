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
}

module.exports = MessageRepository;
