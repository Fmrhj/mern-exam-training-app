import {IndexController} from '../controllers/index.js';
//import endpoints from '../controllers/questions.js';
import express from 'express';
const router =  express.Router();

// rerouting to /questions 
router.route('/')
    .get(IndexController.index);


export {router};
