// const express = require('express');
const multer = require('multer');
const upload = multer({dest:'uploads/'});

const productModel= require('../models/Product');
const cartModel= require('../models/Cart');

/* GET User List */
exports.getProduct = (req, res, next) => {
    console.log('Product List');
    productModel.find((err, productResponse) => {
        if (err) {
            res.send({status: 500, message: 'Unable to Find Product Listing..'});
        } else {
            res.status(200).json(productResponse);
        }
    });
}

/*Get user id*/
exports.getId =  (req, res, next) => {
    // res.send('respond with a resource');
    const id = req.params.id;
    console.log('edit',id);
    productModel.findById(id, (err,data) => {
        if(err){
            res.send({status:500, message:'Unable to Find product by Id'});
        }
        else{
            res.status(200).json(data);
        }
    });
}

/* POST Create New Employees. */
exports.addProduct = (req, res) => {
    // console.log(req.file);
    console.log(req.body);
    const productName = req.body.productName;
    console.log(req.file);
    const image = req.file.path;
    const price = req.body.price;
    const productObj = new productModel({ productName,image, price});
    productObj.save( (err, productObj) => {
        if(err){
            res.send({status: 500, message:'Unable to Add Products ' });
            console.log(err);
        }
        else{
            console.log(productObj);
            res.status(200).json(productObj);
        }
    });
}

/* Update,Edit Product */
exports.editProduct = (req,res) => {
    console.log('update');
    const id = req.params.id;
    const productName = req.body.productName;
    let image = '';
    if(req.file) {
        console.log(req.file.path);
        image = req.file.path;
    } else {
        image = req.body.image;
    }
    console.log(image);
    const price = req.body.price;
    productModel.findByIdAndUpdate(id,{ productName, image, price }, (err,result) => {
        if(err){
            res.send({status: 500, message:'Unable to Update product' });
        }
        else{
            res.status(200).json(result);
            // res.send({status: 200, message:'Update product successfully'});
        }
    });
}

/* Get Delete product by id. */
exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    console.log(id);

    productModel.findByIdAndRemove( id, (err) => {
        if(err){
            res.send({status: 500, message:'Unable to Add Products ' });
            // console.log(err);
        }
        else{
            if(!id){
                res.send({status: 200, message:'Data not found' });
            }else{
                res.send({status:200, message:'Delete Success...'});
            }
        }
    });
}

/* Count Products*/
exports.countAllProducts = (req, res)=>{
    console.log('total users count');
    productModel.count((err,result)=>{
        if(err){
            res.send({status:500, message:'Unable to find total products'});
        } else {
            res.status(200).json(result);
        }
    });
}

/* POST Create New Employees. */
exports.addToCart = (req, res) => {
    const addedProduct = productModel.findById(req.body.id);
    cartModel.save(addedProduct);
    console.log(res);
    // cartModel.save((err, addedProduct) =>{
    //     if(err){
    //         res.send({status: 500, message:'Unable to Add Products ' });
    //         console.log(err);
    //     }
    //     else{
    //         console.log(addedProduct);
    //         res.status(200).json(addedProduct);
    //     }
    // });
}
