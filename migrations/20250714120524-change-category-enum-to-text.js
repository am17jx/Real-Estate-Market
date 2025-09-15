'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
   
    await queryInterface.changeColumn('categories', 'category', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('categories', 'category', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  }
};
