const PropertyCntroller = require('../Controller/propertyController')
const express = require('express');
const router = express.Router();
const auth = require('../Controller/authController');

router
.route('/property/search')
.get(PropertyCntroller.searchProperty);


router
.route('/property')
.get(PropertyCntroller.getallProperty)
.post(auth.protect,PropertyCntroller.createProperty);

router
.route('/property/:id')
.delete(auth.protect,PropertyCntroller.deleteProperty)
.patch(auth.protect,PropertyCntroller.updateProperty);


 
module.exports = router;

