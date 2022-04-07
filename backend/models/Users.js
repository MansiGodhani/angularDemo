const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        isRole :{
            type: String,
            default:"USER"
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        lastLogout: {
            type: Date,
            default: Date.now
        },
        isActive:{
            type: Boolean,
            default:false
        },
    }, { timestamps:{
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }}
);

userSchema.statics.newLogin = function login(id, callback) {
    return this.findByIdAndUpdate(id,{'$set' : { 'lastLogin' : Date.now()} }, { new : true }, callback);
};

userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
})

userSchema.methods.generateAuthToken = async function () {
    try {
        //create token
        let token = jwt.sign({ _id: this._id, userName:this.userName, email: this.email, isRole:this.isRole, isActive:this.isActive }, process.env.JWT_KEY,{expiresIn: '10m'});
        console.log( process.env.JWT_KEY);
        // const token = jwt.sign({_id: user._id,userName: user.userName,email: user.email,}, process.env.JWT_KEY);
        // this.tokens = this.tokens.concat({ token: token });
        return token;
    } catch (err) {
        console.log(err);
    }
};

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;