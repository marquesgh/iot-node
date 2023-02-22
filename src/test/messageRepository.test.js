const { sequelize, Messages, Equipments } = require('../models');
const MessageRepository = require('../repositories/messageRepository');

describe('MessageRepository', () => {
  describe('findAll', () => {
    beforeAll(async () => {
      // Connect to the database.
      await sequelize.authenticate();

      // Sync the models with the database.
      await sequelize.sync({ force: true });

      const equipment = await Equipments.create({
        imei: '123456789012345',
        description: 'Equipment 1',
      });

      // Seed the database with some test data.
      await Messages.bulkCreate([
        {
          tag: 'poweron',
          value: '1',
          timestamp: '2023-02-20 12:10:26',
          equipment_id: equipment.id,
        },
      ]);
    });

    it('returns all messages in a paginated format', async () => {
      // Call the findAll method and verify the response.
      const result = await MessageRepository.findAll({ limit: 2, offset: 0 });
      expect(result.count).toBe(1);
      expect(result.rows).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            tag: 'poweron',
            value: '1',
            timestamp: '20/02/2023 12:10:26',
            equipment_id: expect.anything(),
            Equipment: expect.anything(),
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
