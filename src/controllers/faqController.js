const HttpStatus = require('../constants/httpStatus');
const FaqRepository = require('../repositories/faqRepository');

/**
 * Controller for handling FAQ-related HTTP requests.
 */
class FaqController {
  /**
   * Retrieves all FAQs in a paginated format.
   *
   * @param {Request} req - The Express.js request object.
   * @param {Response} res - The Express.js response object.
   * @returns {Promise<void>} A promise that resolves with the JSON response.
   */
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows } = await FaqRepository.findAll({ limit, offset });
      res.status(HttpStatus.OK).json({
        data: rows,
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

module.exports = FaqController;
