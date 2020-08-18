const router = require('express').Router();
const {signIn,signUp,signOut,findUser, isSignedIn} = require("../controller/user");


//apis

//signup route
router.post('/user/signup', signUp);

//signIn route
router.post('/user/signin', signIn);

//logOut route
router.get("/user/signout",signOut);


//test api
router.get("/testRoute",isSignedIn,(req,res)=>{
    return res.status(200).json({
        auth: req.user
    })
});

module.exports = router;