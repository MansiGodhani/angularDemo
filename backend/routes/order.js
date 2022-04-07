const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');

/* POST Users. */
router.post('/add', orderController.addOrder);

/*PUT edit order*/
router.put('/editCart/:id', orderController.editOrder);

/* DELETE order item by using id */
router.delete('/delete/:id', orderController.deleteOrder);

/* GET  user order */
router.get('/find/:userId', orderController.userId);

/* GET  user order */
router.get('/', orderController.getAll);

/* GET count total count */
router.get('/totalOrder', orderController.getTotalOrder);

module.exports = router;
