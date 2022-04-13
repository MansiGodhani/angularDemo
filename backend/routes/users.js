const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
})

//POST add user
router.post('/addUser', userController.addUser);

//DELETE Users by using id
router.delete('/deleteUser/:id', userController.deleteUser);

//PUT edit users
router.put('/editUser/:id', userController.editUser);

//PUT edit users Profile
router.put('/editProfile/:id',upload.single('profileImg'), userController.editImg);

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
