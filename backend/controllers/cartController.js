const express = require('express');
const cartModel= require('../models/Cart');

/* POST New add cart. */
exports.add = async (req, res) => {
    console.log('req.body', req.body.productId);
    const newCart = new cartModel(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err){
        console.log(err)
        res.status(500).json(err);
    }
}

/* PUT edit cart  */
exports.editCart = async (req, res) => {
    console.log(res);
    try{
        const id = req.params.id;
        console.log(id);

        cartModel.findByIdAndUpdate(id, req.body, (err) => {
            if(err){
                res.send({status: 500, message:'Unable to Update User' });
            }
            else{
                // res.status(200).json();
                res.send({status: 200, message:'Update user successfully'});
            }
        });
        // const updatedCart = await cartModel.findByAndUpdate(req.params.id);
        // res.status(200).json(updatedCart);
    } catch (err){
        res.status(500).json(err);
    }
}

/* DELETE cart item */
exports.deleteCart = async (req, res) => {
    try{
        await cartModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted from cart..");
    }catch (err) {
        res.status(500).json(err);
    }
}

/* GET All */
exports.getAll = async (req, res) => {
    try{
        const carts = await cartModel.find({userId: req.params.id}).populate('productId');
        console.log(carts);
        res.status(200).json(carts);
    } catch (err){
        res.status(500).json(err);
    }
}


// /* GET  user cart */
// exports.userId = async (req, res) => {
//     try{
//         const cart = await cartModel.findOne(req.params.id);
//         res.status(200).json(cart);
//     } catch (err){
//         res.status(500).json(err);
//     }
// }

