const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Property extends Model {
  static associate(models) {
    Property.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    Property.belongsTo(models.Category, { foreignKey: 'categoryid', as: 'category' });
    Property.belongsTo(models.Company, { foreignKey: 'companyid', as: 'Company' });

    Property.belongsToMany(models.Tags, { 
      through: 'property_tags',
      as: 'tags',
      foreignKey: 'property_id',
      otherKey: 'tag_id'
    });
  }
}

Property.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  type: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('Rent', 'Sell'), allowNull: false },
  area: { type: DataTypes.FLOAT, allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT },
}, {
  sequelize,
  modelName: 'Property',
  tableName: 'properties',
  timestamps: true,
});

module.exports = Property;
