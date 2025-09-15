// usermodel.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');
const Property=require('./propertymodel')
const yup = require("yup");




class User extends Model {
   user

static associate(models){
User.hasMany(models.Property, { foreignKey: 'userId', as: 'Property' });
};
}
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  role :{
    type:DataTypes.ENUM('user', 'admin'),
    allowNull: false,
    defaultValue:'user'

  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true,

  hooks :{
    beforeCreate : async (user)=>{
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
    }
  }
});




module.exports = User;
