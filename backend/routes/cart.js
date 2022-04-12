const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cartController');

/* POST New Cart. */
router.post('/add', cartController.add);

/*PUT Edit cart*/
router.put('/editCart/:id', cartController.editCart);

/* DELETE cart item by using id */
router.delete('/delete/:id', cartController.deleteCart);

/* Delete all item empty cart */
router.delete('/allDelete/:id', cartController.emptyCart);

/* GET user cart detials */
router.get('/list/:id', cartController.getAll);

module.exports = router;
