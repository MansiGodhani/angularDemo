const express = require('express');
const router = express.Router();
const multer = require('multer');
// const upload = multer({dest:'/uploads/'});

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

    // if (!file.originalname.match(/\.(png|jpg)$/)) {
    //     // upload only png and jpg format
    //     return cb(new Error('Please upload a Image'))
    // }
    // cb(undefined, true)
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
})

// const upload = multer({ storage: storage }) //without ant limits image size

const productController = require('../controllers/productController');

/* GET User List */
router.get('/list', productController.getProduct);

/* POST Create New Users. */
router.post('/addProducts', upload.single('image'), productController.addProduct);

/* DELETE Products by using id */
router.delete('/delete/:id', productController.deleteProduct);

/*PUT edit users*/
router.put('/editProduct/:id',upload.single('image'), productController.editProduct);

/*GET product id */
router.get('/id/:id', productController.getId);

/* GET Count products. */
router.get('/totalProducts', productController.countAllProducts);

/* POST add-to-cart*/
router.post('/addToCart', productController.addToCart);

module.exports = router;


