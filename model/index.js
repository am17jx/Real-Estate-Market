const User = require('./usermodel');
const Property = require('./propertymodel');
const Category = require('./categories');
const Company = require('./CompanyModel');
const Tags = require('./tagModel');


console.log('Loaded Tags model:', Tags?.name);

const models = { User, Property, Category, Company, Tags };


if (User.associate) User.associate(models);
if (Category.associate) Category.associate(models);
if (Company.associate) Company.associate(models);
if (Property.associate) Property.associate(models);
if (Tags.associate) Tags.associate(models);

module.exports = models;
