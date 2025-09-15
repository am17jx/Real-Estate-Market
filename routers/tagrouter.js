const express = require('express');
const router = express.Router();
const auth = require('../Controller/authController');
const TagController = require('../Controller/TgasController');



router
.route('/tag')
.get(auth.protect,TagController.getallTag)
.post(auth.protect,TagController.createTag);


// router
// .route('/tag/:id')
// .delete(auth.protect,TagController.deleteTag)
// .patch(auth.protect,TagController.updateTag);

router
.route('/tag/:id')
.delete(auth.protect,TagController.deletetagfromproperty)
.post(auth.protect,TagController.addtagtoproperty);

module.exports = router;
