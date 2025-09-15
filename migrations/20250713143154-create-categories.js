'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      category :{
        type: Sequelize.ENUM('Apartments', 'Houses','Villas','Shops','Farms','Others'),
        allowNull: false
      }
})





  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');

 
  }
};
