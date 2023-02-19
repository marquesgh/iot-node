const { sequelize, Equipments, Messages } = require('../models');
const EquipmentRepository = require('../repositories/equipmentRepository');

describe('FaqRepository', () => {
  describe('findAll', () => {
    beforeAll(async () => {
      // Connect to the database.
      await sequelize.authenticate();

      // Sync the models with the database.
      await sequelize.sync({ force: true });

      // Seed the database with some test data.
      const equipment1 = await Equipments.create({
        imei: '123456789012345',
        description: 'Equipment 1',
      });
      const equipment2 = await Equipments.create({
        imei: '234567890123456',
        description: 'Equipment 2',
      });
      const equipment3 = await Equipments.create({
        imei: '345678901234567',
        description: 'Equipment 3',
      });
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);
      await Messages.bulkCreate([
        { tag: 'poweron', value: '1', timestamp: yesterday, equipment_id: equipment1.id },
        { tag: 'poweroff', value: '1', timestamp: now, equipment_id: equipment1.id },
        { tag: 'poweron', value: '1', timestamp: twoDaysAgo, equipment_id: equipment2.id },
        { tag: 'poweron', value: '1', timestamp: now, equipment_id: equipment3.id },
      ]);
    });

    it('returns the counts of on and off equipments', async () => {
      // Call the findAll method and verify the response.
      const result = await EquipmentRepository.getSituation();
      expect(result).toEqual({ on: 2, off: 1 });
    });

    afterAll(async () => {
      // Disconnect from the database.
      await sequelize.close();
    });
  });
});
