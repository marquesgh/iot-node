const { Faqs } = require('../models');

/**
 * Repository for accessing and manipulating FAQ data.
 */
class FaqRepository {
  /**
   * Retrieves all FAQs in a paginated format.
   *
   * @param {number} limit - The maximum number of FAQs to retrieve.
   * @param {number} offset - The number of FAQs to skip before starting to retrieve.
   * @returns {Promise<object>} A promise that resolves with an object containing the FAQs and metadata.
   */
  static findAll({ limit, offset }) {
    return Faqs.findAndCountAll({ limit, offset, attributes: ['description', 'solution'] });
  }
}

module.exports = FaqRepository;
