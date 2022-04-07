const mongoose = require('mongoose');

const orderSchema= mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        },
    }],
    amount: {type: Number, required: true},
    // address: {type: Object, required: true},
    status: {type: String, default: "pending"},
},{
    timestamps:true
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;