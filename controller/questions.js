const Question = require("../models/question");

//post a question askQuestion
exports.askQuestion=(req,res)=>{
    const question = new Question(req.body);
    question.save((err,question)=>{
        if(err){
            return res.status(400).json({
                error:"Oops can't post that question"
            });
        }
        return res.status(200).json({
            message:"Success",
            question
        });
    });
};

//question using params
exports.findQuestion=(req,res,next,id)=>{
    Question
    .findOne({_id:id})
    .populate("user","name email question")
    .exec((err,question)=>{
        if(err){
            return res.status(400).json({
                error:"Can't find that question"
            });
        }
        req.question = question;
        next();
    })
};

//question by questionId
exports.selectedQuestion=(req,res)=>{
    return res.status(200).json(req.question);
};

//Get All questions
exports.getAllQuestions=(req,res)=>{
    Question
    .find()
    .populate("user","email name question")
    .exec((err,questions)=>{
        if(err){
            return res.status(400).json({
                error:"Error occurs "+err
            });
        }
        if(questions.length<=0){
            return res.status(201).json({
                error:"No question is asked"
            })
        }else{
            return res.status(200).json(questions);
        }
    })
};

//deleteQuestion
exports.deleteQuestion=(req,res)=>{
    Question.remove({_id:req.params.questionId},(err,result)=>{
        if(err){
            return res.status(400).json({
                error:"Question can't be deleted"
            });
        }
        //console.log(result);
        return res.status(200).json({
            message:`is deleted`,
            result
        });
    })
};

//modifyQuestion
exports.modifyQuestion=(req,res)=>{
    Question
    .findByIdAndUpdate(
        {_id:req.params.questionId},
        {$set:req.body},
        (err,result)=>{
        if(err){
            return res.status(400).json({
                error:"Error happen can't update your question "+err
            });
        }
        return res.status(200).json({
            message:"Question is updated",
            result
        })
    })
};