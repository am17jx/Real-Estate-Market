const yup = require('yup');

const propertySchema = yup.object().shape({
  type: yup.string().oneOf(['Apartment', 'House', 'Land', 'Office', 'Shop', 'Warehouse', 'Other']),
  status: yup.string().oneOf(['Rent', 'Sell']),
  area: yup.number().positive(),
  address: yup.string(),
  price:yup.number().positive().integer(),




});

module.exports = propertySchema;
