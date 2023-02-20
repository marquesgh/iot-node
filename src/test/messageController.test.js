const request = require('supertest');
const HttpStatus = require('../constants/httpStatus');
const { sequelize, Equipments } = require('../models');
const app = require('../index');

describe('MessageController', () => {
  describe('store', () => {
    beforeAll(async () => {
      // Connect to the database.
      await sequelize.authenticate();

      // Sync the models with the database.
      await sequelize.sync({ force: true });

      const equipment1 = await Equipments.create({
        imei: '123456789012345',
        description: 'Equipment 1',
      });
    });

    it('store message', async () => {
      const response = await request(app)
        .post('/store')
        .send({
          payload: 'poweron,123456789012345, 1, 2023-02-20 12:10:26',
        })
        .set('Accept', 'application/json')
        .expect(HttpStatus.CREATED);
    });

    it('invalid payload', async () => {
      const response = await request(app)
        .post('/store')
        .send({
          payload: 'poweron',
        })
        .set('Accept', 'application/json')
        .expect(HttpStatus.BAD_REQUEST);
    });

    afterAll(async () => {
      // Disconnect from the database.
      await sequelize.close();
    });
  });
});
