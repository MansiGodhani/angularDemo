const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cartController');

/* POST Users. */
router.post('/add', cartController.add);

/*PUT edit cart*/
router.put('/editCart/:id', cartController.editCart);

/* DELETE cart item by using id */
router.delete('/delete/:id', cartController.deleteCart);

// /* GET  user cart */
// router.get('/find/:userId', cartController.userId);

/* GET  user cart */
router.get('/list/:id', cartController.getAll);

module.exports = router;
