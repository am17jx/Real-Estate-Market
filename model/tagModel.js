const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Tags extends Model {
  static associate(models) {
    Tags.belongsToMany(models.Property, {
      through: 'property_tags',
      as: 'properties',
      foreignKey: 'tag_id',
      otherKey: 'property_id'
    });
  }
}

Tags.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Name: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'Tags',
  tableName: 'tags',
  timestamps: false,
});

module.exports = Tags;
