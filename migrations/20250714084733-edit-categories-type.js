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
        type: Sequelize.TEXT,
        allowNull: false
      }
})





  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');

 
  }
};
