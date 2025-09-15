'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('property_tags', {
      tag_id: {  
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tags', 
          key: 'id'
        },
     
      },
      property_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'properties', 
          key: 'id'
        },
       
      },
  
    });

    await queryInterface.addConstraint('property_tags', {
      fields: ['tag_id', 'property_id'],
      type: 'primary key',
      name: 'property_tags_pkey'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('property_tags');
  }
};
