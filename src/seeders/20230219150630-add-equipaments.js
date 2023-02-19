'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const equipments = [];
    for (let aux = 0; aux < 10; aux++) {
      equipments.push({
        imei: faker.random.numeric(10),
        description: faker.random.words(5),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Equipments', equipments);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Equipments', null, {});
  },
};
