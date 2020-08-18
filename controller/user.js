require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");



//params unique user
exports.findUser=(req,res,next,id)=>{
    User
    .findById(id)
    .exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User is not found"
            });
        }
        req.profile=user;
        req.profile.password=undefined;
        next();
    })
}



//signUp
exports.signUp=(req,res)=>{
    User
    .findOne({email:req.body.email})
    .exec()
    .then(err=>{
        return res.status(404).json({
            error:`${err.email} already exist`
        })
    })
    .catch(user=>{
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            //console.log(req.body.password+" "+user.password);
            if(err){
                return res.status(400).json({
                    error:"User creation failed"+err
                });
            }else{
                req.body.password=hash;
                console.log(req.body);
                const user=new User(req.body);
                user
                .save()
                .then(user=>res.status(200).json({message:"User created",user}))
                .catch(err=>res.status(400).json({error:"User is not created"+err}));
            }
        });
    })
};

//signIn
exports.signIn=(req,res) =>{
    User
    .findOne({email:req.body.email})
    .exec((err,user)=>{
        if(err){
            return res.status(404).json({
                error:"Auth failed!"
            });
        }
        console.log(user);
        bcrypt.compare(req.body.password,user.password,(err,result)=>{
            //console.log(result);
            if(err || !result)
            {
                return res.status(404).json({
                    error:"Auth failed"
                });
            }else{
                const token=jwt.sign({id:user._id},process.env.SECRET,
                    {expiresIn:Date.now()*365*2});
                return res.status(200).json({
                    message:"Sign in Successfully",
                    token:token
                })
            }
        })
    });
};

//signOut
exports.signOut=(req,res)=>{
    //have to delete Token
    return res.status(200).json({
        message:"Sign in success"
    });
};


//isSignedIn middleware
exports.isSignedIn=expressJwt({
        secret: process.env.SECRET
});

//isAuthenticated middleware
exports.isAuthenticated=(req,res,next)=>{
    if(req.profile && req.user && req.profile._id == req.user.id)
        next();
    else{
        return res.status(401).json({
            Message:"You are not authorized"
        });
    }
}
