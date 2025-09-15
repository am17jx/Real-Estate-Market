'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('properties', 'properties_categoryid_fkey1');

    await queryInterface.addColumn('properties', 'companyid', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addConstraint('properties', {
      fields: ['companyid'],
      type: 'foreign key',
      name: 'properties_companyid_fkey', 
      references: {
        table: 'Companies',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('properties', 'properties_companyid_fkey');
    await queryInterface.removeColumn('properties', 'companyid');
  },
};
