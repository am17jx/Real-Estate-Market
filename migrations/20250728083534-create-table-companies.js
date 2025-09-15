'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      Name :{
        type:Sequelize.STRING,
        allowNull: false
      }
})





  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');

 
  }
};
