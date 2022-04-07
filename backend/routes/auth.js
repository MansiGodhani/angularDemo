const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userModel = require('../models/Users');
const bcrypt = require('bcrypt');

//user login
router.post('/register', async (req,res)=>{
    //check email already exist
    const emailExist= await userModel.findOne({ email:req.body.email});
    if(emailExist) return res.status(400).send('Email Already Exist');

    //create new user
    const user = new userModel({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        // profileImg: req.body.profileImg,
    });

    try{
        const saveUser = await user.save();
        res.send(saveUser);
    }catch (err) {
        res.status(400).send(err);
    }
})

router.post('/login', async (req, res) => {
    userModel.findOneAndUpdate({isRole:'USER', email:req.body.email}, {lastLogin: Date.now()}, (err, data) => {
        if (err) console.log(err);
        else console.log("Successfully updated the lastLogin", data);
    });
    userModel.findOneAndUpdate({isRole:'USER', email:req.body.email}, {isActive: true}, (err, data) => {
        if (err) console.log(err);
        else console.log("Successfully updated the active status", data);
    });

    //one token both access
    // const user = await userModel.findOne({  email:req.body.email });
    // if(!user) return res.status(400).send('Invalid Email and Password');
    // const token = await user.generateAuthToken();
    // res.status(200).send({ accessToken: token});

    //create two token
    //check email already exist
    //check user
    const user = await userModel.findOne({ isRole:'USER',email:req.body.email });
    //check admin
    const admin = await userModel.findOne({ isRole:'ADMIN', email:req.body.email });

    if(user) {
        //check password
        const validUserPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validUserPassword) return res.status(400).send('Incorrect Password ');
        const token = await user.generateAuthToken();
        res.status(200).send({ accessToken: token});

        console.log('user logged in');
    } else if(admin){
        const validAdminPassword = await bcrypt.compare(req.body.password, admin.password);
        if(!validAdminPassword) return res.status(400).send('Incorrect Password ');
        const adminToken = await admin.generateAuthToken();
        res.status(200).send({ adminToken: adminToken});
        console.log('admin logged in');
    }else{
        return res.status(400).send('Invalid Email and Password');
    }
    // res.send('Logged in!!');
})

router.put('/logout', function(req,res){
    try{
        //Update logout time
        userModel.findOneAndUpdate({isRole:'USER', email:req.body.email}, {lastLogout: Date.now()}, (err, data) => {
            if (err) console.log(err);
            else console.log("Successfully updated the lastLogout", data);
        });

        //Update Active-InActive Status
        userModel.findOneAndUpdate({isRole:'USER', email:req.body.email}, {isActive: false}, (err, data) => {
            if (err) console.log(err);
            // else console.log("Successfully updated the inactive status", data);
            else res.status(200).send({data:'update inactive'});
        });
    }catch (err){
        console.log(err);
    }

});

// router.post('/login/admin', async (req, res) => {
//     //check role
//     const admin = await userModel.findOne({ isRole:'ADMIN', email:req.body.email });
//     if(!admin) return res.status(400).send('Invalid Email and Password');
//     console.log(admin);
//
//     //check password
//     const validPassword = await bcrypt.compare(req.body.password, admin.password)
//     if(!validPassword) return res.status(400).send('Incorrect Password ');
//
//     //create and assign a token
//     const token = await admin.generateAdminAuthToken();
//     console.log(token);
//     res.status(200).send({ adminToken: token });
//     // res.send('Logged in!!');
//     console.log("Admin Logged in!!!");
// })

module.exports = router;