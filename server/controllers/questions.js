import {QuestionSet} from '../models/question.js';

const QuestionController = {}

QuestionController.getQuestions = async (req, res, next) => {
    try {
        var result = await QuestionSet.find().exec();
        res.status(200).send(result);
    } catch (err) {
        response.status(500).send(err);
    }
}

QuestionController.postQuestions = async (req, res) => {
    try {
        var newQuestionSet = new QuestionSet(req.body);
        var result = await newQuestionSet.save();
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
}
    
QuestionController.getSetName = (req, res, next) => {
    QuestionSet.find({setname: `set ${req.params.setname}`}, (err, result) => {
        if (err) {
            next(err)
        }
        res.status(200).json(result[0]);
    });
}

QuestionController.postSetName = (req, res) => {
    //

}

QuestionController.getQuestion = (req, res) => {
    mongoClient.getSet(req.params.setname).then(
        function(response){
            // Get always first element 
            let reponseArray = response[0].questions;
            res.status(200).json(reponseArray.filter((question) => question.index == req.params.id)[0]);
        })
}

QuestionController.putQuestionExplanation =  (req, res, next) => {
    
    QuestionSet.updateOne(
        {"questions.index": req.params.id, "setname": `set ${req.params.setname}`}, 
        {"$set": {"questions.$.explanation": req.body.explanation}}, 
        (err, result) => {
        if (err)  {
            next(err)
        }
        res.status(200).json(result);
    })  
}

export {QuestionController}