'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('categories', {
      fields: ['category'],
      type: 'unique',
      name: 'unique_category_constraint' 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('categories', 'unique_category_constraint');
  }
};
