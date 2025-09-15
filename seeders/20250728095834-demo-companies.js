'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Companies', [
      { 
        Name: 'Company a', 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        Name: 'Company b', 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});s
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
