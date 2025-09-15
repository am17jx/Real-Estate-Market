const categorycontroller = require('../Controller/categoryController')
const express = require('express');
const router = express.Router();

const auth = require('../Controller/authController');



router
  .route('/property/category/:id')
  .post(auth.protect, auth.checkRole, categorycontroller.createCategoryInProperty);


router
  .route('/category')
  .get(auth.protect,categorycontroller.getcategory)
  .post(auth.protect,categorycontroller.createcategory);


  router
  .route('/category/:id')
  .patch(auth.protect,categorycontroller.updatecategory)
  .delete(auth.protect,categorycontroller.deletecategory);


 
module.exports = router;

