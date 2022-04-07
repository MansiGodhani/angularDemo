const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//POST add user
router.post('/addUser', userController.addUser);

//DELETE Users by using id
router.delete('/deleteUser/:id', userController.deleteUser);

//PUT edit users
router.put('/editUser/:id', userController.editUser);

//GET user id
router.get('/id/:id', userController.getId);

//get all user
router.get('/list', userController.getUser);

//get count all user
router.get('/totalUsers', userController.countAllUser);

//get count all active user
router.get('/totalActiveUsers', userController.countActiveUser);

//get count all in-active user
router.get('/totalInActiveUsers', userController.countInActiveUser);

module.exports = router;