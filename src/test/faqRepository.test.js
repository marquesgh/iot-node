const { sequelize, Faqs } = require('../models');
const FaqRepository = require('../repositories/faqRepository');

describe('FaqRepository', () => {
  describe('findAll', () => {
    beforeAll(async () => {
      // Connect to the database.
      await sequelize.authenticate();

      // Sync the models with the database.
      await sequelize.sync({ force: true });

      // Seed the database with some test data.
      await Faqs.bulkCreate([
        { description: 'Problem 1', solution: 'Solution 1' },
        { description: 'Problem 2', solution: 'Solution 2' },
        { description: 'Problem 3', solution: 'Solution 3' },
      ]);
    });

    it('returns all FAQs in a paginated format', async () => {
      // Call the findAll method and verify the response.
      const result = await FaqRepository.findAll({ limit: 2, offset: 0 });
      expect(result.count).toBe(3);
      expect(result.rows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            description: 'Problem 1',
            solution: 'Solution 1',
          }),
          expect.objectContaining({
            description: 'Problem 2',
            solution: 'Solution 2',
          }),
        ])
      );
    });

    afterAll(async () => {
      // Disconnect from the database.
      await sequelize.close();
    });
  });
});
