const express = require('express');

const userModel = require('../models/Users');

/*Get user list*/
exports.getUser = (req, res)=>{
    console.log('user list');
    userModel.find({isRole:"USER"},(err, result)=>{
        if(err){
            res.send({status:500, message:'Unable to find user'});
        } else {
            res.status(200).json(result);
        }
    })
}

/*Get user id*/
exports.getId =  (req, res, next) => {
    // res.send('respond with a resource');
    const id = req.params.id;
    console.log('edit',id);
    userModel.findById(id, (err,data) => {
        if(err){
            res.send({status:500, message:'Unable to Find users by Id'});
        }
        else{
            res.status(200).json(data);
        }
    });
}

/* POST Create New User. */
exports.addUser = async (req, res) => {
    // console.log(req.file);
    const emailExist= await userModel.findOne({ email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already Exist');

    console.log(req.body);
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const userObj = new userModel({ userName,email, password});
    userObj.save( (err, userObj) => {
        if(err){
            res.send({status: 500, message:'Unable to Add User ' });
            console.log(err);
        }
        else{
            console.log(userObj);
            res.status(200).json(userObj);
        }
    });
}

//Update,Edit User
exports.editUser =  (req,res) => {
    console.log('update');
    const id = req.params.id;

    console.log(id);

    userModel.findByIdAndUpdate(id, req.body, (err) => {
        if(err){
            res.send({status: 500, message:'Unable to Update User' });
        }
        else{
            // res.status(200).json();
            res.send({status: 200, message:'Update user successfully'});
        }
    });
}

/* Edit users Profile */
exports.editImg = (req,res) => {
    console.log('update');
    const id = req.params.id;
    let profileImg = '';
    if(req.file) {
        console.log(req.file.path);
        profileImg = req.file.path;
    } else {
        profileImg = req.body.profileImg;
    }
    console.log(id,profileImg);
    // const price = req.body.price;
    userModel.findByIdAndUpdate(id,{ profileImg }, (err,result) => {
        if(err){
            res.send({status: 500, message:'Unable to Update Profile Image' });
        }
        else{
            res.status(200).json(result);
            // res.send({status: 200, message:'Update product successfully'});
        }
    });
}

/* Delete user by id. */
exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    console.log(id);

    userModel.findByIdAndRemove( id, (err) => {
        if(err){
            res.send({status: 500, message:'Unable to delete Users ' });
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

/* Count users*/
exports.countAllUser = (req, res)=>{
    console.log('total users count');
    userModel.count({isRole:"USER"},(err,result)=>{
        if(err){
            res.send({status:500, message:'Unable to find total user'});
        } else {
            res.status(200).json(result);
        }
    })
}

/* Count Active Users */
exports.countActiveUser = (req, res)=>{
    console.log('total active users');
    userModel.count({isRole:"USER",isActive:true}, (err,result)=>{
        if(err){
            res.send({status:500, message:'Unable to find total active user'});
        } else {
            res.status(200).json(result);
        }
    })
}

/* Count In-Active Users */
exports.countInActiveUser = (req, res)=>{
    console.log('total in active users');
    userModel.count({isRole:"USER",isActive:false}, (err,result)=>{
        if(err){
            res.send({status:500, message:'Unable to find total in-active user'});
        } else {
            res.status(200).json(result);
        }
    })
}
