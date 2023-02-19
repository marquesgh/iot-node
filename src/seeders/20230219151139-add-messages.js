'use strict';

const { faker } = require('@faker-js/faker');
const database = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const messages = [];
    const equipments = await database.Equipments.findAll();
    for (let aux = 0; aux < 10; aux++) {
      const equipment = faker.helpers.arrayElement(equipments);
      messages.push({
        tag: faker.helpers.arrayElement(['poweron', 'poweroff', 'timebased']),
        value: faker.random.words(10),
        timestamp: faker.date.recent(),
        equipment_id: equipment.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Messages', messages);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
