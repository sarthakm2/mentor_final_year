const router = require("express").Router();


//onst { shuffle } = require("../helper/array")
const { authorisation } = require("../helper/auth")
const physics = require("../model/Physics");
const chemistry = require("../model/Chemistry");
const maths = require("../model/Maths");
const demo = require("../model/Question");

const setSubject = (id) => {
  switch (id) {
    case '1':
      return physics;
    case '2':
      return chemistry;
    case '3':
      return maths;
    case '4':
      return demo;
    default:
      return demo;
  }
}
/**
 * @route GET /api/question
  * @desc Picks all the questions from db 
  * and respond with the questions,
*/
router.get("/:id", authorisation, (req, res) => {
  let Question;
  Question = setSubject(req.params.id);
  Question.find({})
    .select("-answer")
    .then(questions => {
      // questions = shuffle(questions)
      res.status(200).json(questions);
    })


})


/**
 * @route GET /api/question/evaluate
  * @desc Evaluate each question from the request 
  * and generate the total weightage mark, 
  * weightage scored by the user and respond with
  * these along with attended question
*/
router.post("/evaluate/:id", authorisation, (req, res) => {
  const userAnswers = req.body.questions;
  let totalWeightage = 0, scoredWeightage = 0, incorrectTags = [], correctNum = 0, incorrectNum = 0;

  const attendedQuestions = [];
  let Question;

  Question = setSubject(req.params.id);
  Question.find({})
    .then(questions => {
      /* Iterates over the entire questions in database. */
      questions.map(correctQuestion => {
        /* Calculate total weightage by summing up each weightage marks. */
        totalWeightage += correctQuestion.weightage
        /* Iterates over the attended question by the user (data recevied from client) */
        userAnswers.find(userAnswer => {
          if (userAnswer._id == correctQuestion._id) {
            /*  
              Checks for correct answer and increments the score weightage
              by the required weightage.
              If the answers are incorrect, the tags are puhed into the incorrectTags
              array. 
              [Needs a better algorithm to calculate weightage]
            */
            if (userAnswer["answer"] == correctQuestion["answer"]) {
              correctNum = correctNum + 1;
              scoredWeightage += userAnswer.weightage;
              attendedQuestions.push(correctQuestion);
              return true;
            } else {
              incorrectNum++;
              scoredWeightage = scoredWeightage - 1;
              const incorrectTag = correctQuestion.tags[0];
              incorrectTags.push(incorrectTag);

              attendedQuestions.push({
                ...correctQuestion._doc,
                userPick: userAnswer.answer
              })
              return false;
            }
          }
          return false;
        });
      });

      res.status(200).json({
        totalWeightage: totalWeightage,
        scoredWeightage: scoredWeightage,
        attendedQuestions: attendedQuestions,
        correctNum: correctNum,
        incorrectNum: incorrectNum,
        incorrectTags: incorrectTags.filter((tag, i) => incorrectTags.indexOf(tag) == i)
      });
    })


})

/**
 * @route POST /api/question/add
 * @desc Add question to DB (from mcq_20.js)
 * For Development Purpose only - NEEDS TO BE DELETED IN PRODUCTION
*/
/* router.get("/addall", async (req, res) => {

  await ques.map( async q => {
    await new Question({
      question: q.question,
      options: q.options,
      answer: q.answer,
      weightage: q.weightage,
      tags: q.tags
    })
      .save()
      .then(que => console.log(que));
  });
  res.status(200).json({ "OK": true })
}); */

module.exports = router;