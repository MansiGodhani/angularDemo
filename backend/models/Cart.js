const mongoose = require('mongoose');

const cartSchema= mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    qty: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
})

const cartModel = mongoose.model('carts', cartSchema);
module.exports = cartModel;