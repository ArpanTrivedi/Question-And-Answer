const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const answerSchema = new mongoose.Schema({
    question:{
        type:ObjectId,
        ref:"Question"
    },
    answer:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("Answer",answerSchema);