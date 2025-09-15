'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('properties', 'categoryid', {
      type: Sequelize.INTEGER,  
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('properties', 'category');
  }
};
