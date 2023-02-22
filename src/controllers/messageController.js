const HttpStatus = require('../constants/httpStatus');
const MessageRepository = require('../repositories/messageRepository');
const { Equipments } = require('../models');

/**
 * Controller for handling Message-related HTTP requests.
 */
class MessageController {
  /**
   * Store messages.
   *
   * @param {Request} req - The Express.js request object.
   * @param {Response} res - The Express.js response object.
   * @returns {Promise<void>} A promise that resolves with the JSON response.
   */
  static async store(req, res) {
    try {
      const payload = req.body.payload.split(',');

      const tag = payload[0];
      const imei = payload[1];
      const value = payload[2];
      const timestamp = payload[3];
      var equipment = null;

      if (imei) {
        equipment = await Equipments.findOne({
          attributes: ['id'],
          where: { imei: imei.trim() },
          raw: true,
        });
      }

      if (!imei || !tag || !value || !timestamp || !equipment) {
        return res.status(HttpStatus.BAD_REQUEST).send({ error: 'Invalid payload' });
      }

      const message = await MessageRepository.store({
        tag: tag.trim(),
        equipment_id: equipment.id,
        value: value.trim(),
        timestamp: timestamp.trim(),
      });
      res.status(HttpStatus.CREATED).json({
        data: message,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }

  /**
   * Retrieves all messages in a paginated format.
   *
   * @param {Request} req - The Express.js request object.
   * @param {Response} res - The Express.js response object.
   * @returns {Promise<void>} A promise that resolves with the JSON response.
   */
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await MessageRepository.findAll({ limit, offset });
      const messages = rows.map((message) => {
        return {
          id: message.id,
          tag: message.tag,
          value: message.value,
          imei: message.Equipment.imei,
          timestamp: message.timestamp,
        };
      });
      res.status(HttpStatus.OK).json({
        data: messages,
        meta: {
          totalCount: count,
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
        },
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

module.exports = MessageController;
