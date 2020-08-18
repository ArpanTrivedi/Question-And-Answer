const mongoose = require('mongoose');
const {ObjectId}=mongoose.Schema;

//questionSchema 
const questionSchema = new mongoose.Schema({

    question:{
        type:String,
        minlength:7,
        required:true
    },
    name:{
        type:ObjectId,
        ref:"User"
    }

},{timestamps:true});

module.exports=mongoose.model("Question",questionSchema);