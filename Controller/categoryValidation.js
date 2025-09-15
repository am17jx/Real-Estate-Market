const yup = require('yup');

const categorySchema = yup.object().shape({
  name: yup.string().required("category is required"),
 
});

module.exports = categorySchema;
