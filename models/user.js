const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required:true,
        trim:true,
        match:/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
    },
    password:{
        minlength:6,
        required:true,
        type:String,
        trim:true
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);