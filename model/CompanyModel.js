const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); 

class Company extends Model {
  static associate(models) {
    Company.hasMany(models.Property, { foreignKey: 'companyid', as: 'Property' });
};
  
    
      }


Company.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  

}, {
  sequelize,              
  modelName: 'Company',  
  tableName: 'Companies',
  timestamps: true        
});

module.exports = Company; 
