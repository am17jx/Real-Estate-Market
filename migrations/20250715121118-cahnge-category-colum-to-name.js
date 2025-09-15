'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('categories', 'category', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('categories', 'category', 'name');
  }
};
