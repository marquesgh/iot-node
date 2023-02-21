'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Faqs',
      [
        {
          description: 'Error code = MEMORY_FAILURE',
          solution: 'The device must be restarted.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          description: 'Error code = BAD_CONFIGURATION',
          solution: 'Open a technical assistance call.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Faqs', null, {});
  },
};
