const Answer = require("../models/answer");



//deleteAnswer
exports.findAnswer=(req,res,next,id)=>{
    Answer
    .findById(id)
    .exec((err,ans)=>{
        if(err || !ans)
        {
            return res.status(404).json({
                error:"Answer not found"
            });
        }
        req.ans=ans;
        next();
    })
};

//find all answer to q question
exports.getAllAnswers=(req,res)=>{
    Answer.find({question:req.params.questionId}).exec((err,answers)=>{
        if(err){
            return res.status(400).json({
                error:"Error occur in this "+err
            });
        }if(answers.length<=0){
            return res.status(201).json({
                message:"No answer found to the question"
            })
        }else{
            //console.log(answers);
            return res.status(200).json({
                message:"Success",
                answers
            });
        }
    })
};

//post answer
exports.answerQuestion=(req,res)=>{
    const ans = new Answer(req.body);
    ans.save((err,ans)=>{
        if(err){
            return res.status(200).json({
                error:"Error occur "+err
            });
        }
        return res.status(200).json({
            message:"answered the questions",
            ans
        });
    })
};

//find Particular answer
exports.ans=(req,res)=>{
    return res.status(200).json(req.ans);
};

//deleteAnswer
exports.deleteAnswer=(req,res)=>{
    Answer
    .remove({_id:req.params.answerId},(err,result)=>{
        if(err||!result){
            return res.status(404).json({
                error:"Can't delete the answer"
            });
        }
        return res.status(200).json({
            message:`question is deleted `
        });
    });
};

//patchAnswerApi
exports.patchAnswer=(req,res)=>{
    Answer
    .findByIdAndUpdate({_id:req.params.answerId},{$set:req.body},(err,result)=>{
        if(err || !result){
            return res.status(404).json({
                error:"can't modify the answer"
            });
        }
        return res.status(200).json({
            message:`Answer successfully modified`
        });
    })
}