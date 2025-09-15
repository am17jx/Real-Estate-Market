const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class property_tags extends Model {
    static associate(models) {
        property_tags.belongsTo(models.Property, { foreignKey: 'property_id', as: 'property' });
        property_tags.belongsTo(models.Tag, { foreignKey: 'tag_id', as: 'tag' });
    }
}

property_tags.init(
  {
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      references: {
        model: 'tags',
        key: 'id'
      },
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'properties',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    modelName: 'property_tags',
    tableName: 'property_tags',
    timestamps: false,
  }
);

module.exports = property_tags;
