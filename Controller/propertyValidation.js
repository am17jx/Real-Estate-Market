const yup = require('yup');

const propertySchema = yup.object().shape({
  type: yup.string().oneOf(['Apartment', 'House', 'Land', 'Office', 'Shop', 'Warehouse', 'Other']).required("type is required"),
  status: yup.string().oneOf(['Rent', 'Sell']).required("status is required"),
  area: yup.number().required("area is required").positive(),
  address: yup.string().required("address is required"),
  price:yup.number().required("price is required").positive().integer(),
  description:yup.string().nullable(),
  categoryid:yup.number().nonNullable(),
  userId:yup.number().nullable(),
  companyid:yup.number().nullable()




});

module.exports = propertySchema;
