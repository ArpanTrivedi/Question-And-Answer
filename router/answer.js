const router = require('express').Router();
const {getAllAnswers,answerQuestion,findAnswer,deleteAnswer,ans,patchAnswer} = require("../controller/answer");
const {findQuestion} = require("../controller/questions");
const {isSignedIn,isAuthenticated} = require("../controller/user");


//params
router.param("questionId",findQuestion);
router.param("answerId",findAnswer);


//apis

//getApis
router.get('/answer/:questionId', getAllAnswers);
router.get("/:answerId", isSignedIn,ans)


//postApi
router.post('/answer/', isSignedIn,answerQuestion);


//deleteApi
router.delete('/answer/:answerId',isSignedIn,isAuthenticated,deleteAnswer);

//putApi
router.put('/answer/:answerId', isSignedIn,isAuthenticated,patchAnswer);

module.exports = router;