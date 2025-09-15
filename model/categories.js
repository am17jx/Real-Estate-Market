const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); 

class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Property, {
        foreignKey: 'categoryid',
        as: 'properties',
      });
      
 }
}
Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'  
  },
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories',
  timestamps: true,
});




module.exports = Category; 
