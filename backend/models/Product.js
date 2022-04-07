const mongoose = require('mongoose');

const productSchema= mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    price:{
        type: String,
        required: true
    },
},{ timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }});

const productModel = mongoose.model('products', productSchema);
module.exports = productModel;