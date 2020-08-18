const router = require('express').Router();
const {askQuestion,findQuestion,selectedQuestion,getAllQuestions,deleteQuestion,modifyQuestion} = require("../controller/questions");
const {isSignedIn,isAuthenticated,findUser} = require("../controller/user");

//params
router.param("questionId",findQuestion);
router.param("userId",findUser);

//apis


//get apis or read apis
router.get('/question/:userId/getAllQuestion',isSignedIn,isAuthenticated,getAllQuestions);
router.get("/question/:questionId",selectedQuestion);

//post question
router.post('/question/askQuestion',isSignedIn,askQuestion);

//delete question
router.delete('/question/:questionId',isSignedIn,isAuthenticated,deleteQuestion);


//patch api
router.put('/question/:questionId',isSignedIn,isAuthenticated,modifyQuestion);

module.exports = router;