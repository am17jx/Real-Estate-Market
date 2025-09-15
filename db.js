const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ameer_db', 'postgres', 'newcore', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
