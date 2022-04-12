const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//user register
router.post('/register', authController.register);

//login
router.post('/login', authController.login);

//logout
router.put('/logout', authController.logout);

//adminLogin
// router.post('/login/admin', authController.adminLogin);

module.exports = router;