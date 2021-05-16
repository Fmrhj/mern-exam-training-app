import {QuestionController} from '../controllers/questions.js';
import express from 'express';

const router =  express.Router();

// register routings: /questions
router.route('/')
    .get(QuestionController.getQuestions)
    .post(QuestionController.postQuestions);

router.route('/:setname')
    .get(QuestionController.getSetName)
    .post(QuestionController.postSetName);

router.route('/:setname/:id')
    .get(QuestionController.getQuestion)
    .put(QuestionController.putQuestionExplanation)

export {router};