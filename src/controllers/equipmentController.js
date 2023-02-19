const HttpStatus = require('../constants/httpStatus');
const EquipmentRepository = require('../repositories/equipmentRepository');

/**
 * Controller for handling Equipment-related HTTP requests.
 */
class EquipmentController {
  /**
   * Retrieves the number of devices turned on and off.
   *
   * @param {Request} req - The Express.js request object.
   * @param {Response} res - The Express.js response object.
   * @returns {Promise<void>} A promise that resolves with the JSON response.
   */
  static async getSituation(req, res) {
    try {
      const result = await EquipmentRepository.getSituation();
      res.json({
        data: result,
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  }
}

module.exports = EquipmentController;
