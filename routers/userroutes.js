// const usreController = require('../Controller/userController')
const express = require('express');
const router = express.Router();
const auth = require('../Controller/authController')


  router
  .route('/signup')
  .post(auth.signup);

  router
  .route('/login')
  .post(auth.login);

  module.exports = router;