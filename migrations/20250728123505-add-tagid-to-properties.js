'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('properties', 'tag_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addConstraint('properties', {
      fields: ['tag_id'],
      type: 'foreign key',
      name: 'properties_tagid_fkey', 
      references: {
        table: 'tags',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('properties', 'properties_tagid_fkey');
    await queryInterface.removeColumn('properties', 'tag_id');
  },
};
