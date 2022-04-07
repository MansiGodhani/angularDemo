const express = require('express');

const orderModel= require('../models/Order');

/* POST New add order. */
exports.addOrder = async (req, res) => {
    const newOrder = new orderModel(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err){
        res.status(500).json(err);
    }
}

/* PUT edit order  */
exports.editOrder = async (req, res) => {
    try{
        const updatedOrder = await orderModel.findByAndUpdate(req.params.id,{$set:req.body}, { new:true });
        res.status(200).json(updatedOrder);
    } catch (err){
        res.status(500).json(err);
    }
}

/* DELETE order item */
exports.deleteOrder = async (req, res) => {
    try{
        await orderModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted from cart..");
    }catch (err) {
        res.status(500).json(err);
    }
}

/* GET user orders */
exports.userId = async (req, res) => {
    try{
        const orders = await orderModel.findOne({userId:req.params.id});
        res.status(200).json(orders);
    } catch (err){
        res.status(500).json(err);
    }
}

/* GET All */
exports.getAll = async (req, res) => {
    try{
        const orders = await orderModel.find();
        res.status(200).json(orders);
    } catch (err){
        res.status(500).json(err);
    }
}


/* GET All Order */
exports.getTotalOrder = async (req, res) => {
    try{
        orderModel.count({},(err,result)=>{
            if(err){
                res.send({status:500, message:'Unable to find total user'});
            } else {
                res.status(200).json(result);
            }
        });
        // const orders = await orderModel.count({_id});
        // res.status(200).json(orders);
    } catch (err){
        res.status(500).json(err);
    }
}
